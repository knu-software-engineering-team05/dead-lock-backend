import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosisModel } from './entities/diagnosis.entity';
import { CreateDiagnosisRequestDto } from './dto/create-diagnosis-reqeust.dto';

import OpenAI from 'openai';
import { UserModel } from 'src/users/entities/user.entity';
import { calculateAge } from './utils/calculateAge';
import { DiagnosisReportResponseDto } from './dto/diagnosis-response.dto';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(DiagnosisModel)
    private readonly diagnosisRepository: Repository<DiagnosisModel>,
  ) {}

  public async readDiagnosisReports(user: UserModel) {
    return this.diagnosisRepository.find({ where: { user } });
  }

  public async readDiagnosisReportById(id: number, user: UserModel) {
    const diagnosis = await this.diagnosisRepository.findOne({
      where: { id, user },
    });
    if (!diagnosis)
      throw new NotFoundException(
        `${id} 에 해당하는 진단결과가 존재하지 않습니다`,
      );
    return diagnosis;
  }

  public async createDiagnosisReport(
    user: UserModel,
    createDiagnosisReportRequestDto: CreateDiagnosisRequestDto,
  ) {
    const predictedStrokeProbability = await this.predictStrokeRate(
      user,
      createDiagnosisReportRequestDto,
    );

    const report = {
      ...(await this.createImprovementReport(
        predictedStrokeProbability,
        createDiagnosisReportRequestDto,
      )),
      stroke_probability: predictedStrokeProbability,
    };

    const newDiagnosis = await this.diagnosisRepository.create({
      score: 100 - report.stroke_probability,
      stroke_probability: report.stroke_probability,
      total_diagnosis: report.total_diagnosis,
      eating_habits: report.eating_habits,
      lifestyle_habits: report.lifestyle_habits,
      user: user,
    });

    return new DiagnosisReportResponseDto(
      this.diagnosisRepository.save(newDiagnosis),
    );
  }

  public async deleteDiagnosisReport(id: number, user: UserModel) {
    const diagnosisReport = await this.readDiagnosisReportById(id, user);

    if (!diagnosisReport)
      throw new NotFoundException(
        `${id} 에 해당하는 진단결과가 존재하지 않습니다`,
      );

    return this.diagnosisRepository.delete(id);
  }

  private async predictStrokeRate(
    user: UserModel,
    createDiagnosisReportRequestDto: CreateDiagnosisRequestDto,
  ) {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age: calculateAge(user.birth),
        gender: user.gender,
        ...createDiagnosisReportRequestDto,
      }),
    });

    const result: { stroke_probability: string } = await response.json();
    return parseFloat(result.stroke_probability.slice(0, -2));
  }

  private async createImprovementReport(
    predictedStrokeProbability: number,
    createDiagnosisReportRequestDto: CreateDiagnosisRequestDto,
  ) {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
      organization: process.env.OPEN_AI_ORG_KEY,
      project: process.env.OPEN_AI_PROJ_KEY,
    });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `
          ${createDiagnosisReportRequestDto}
          ${predictedStrokeProbability}
          여기 뇌졸중 관련 데이터와 예측된 뇌졸중 발병확률을 줄게
          이 데이터들을 사용해 종합 건강 진단 결과, 식습관 개선방안, 생활습관 개선방안을
          total_diagnosis, eating_habits, lifestyle_habits 프로퍼티값을 갖는 Json 으로 만들어줘
          각각 200자 이상으로 채워줘
      `,
        },
      ],
      model: 'gpt-3.5-turbo-16k',
    });

    return JSON.parse(completion.choices[0].message.content);
  }
}
