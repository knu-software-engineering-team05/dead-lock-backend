import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosisModel } from './entities/diagnosis.entity';
import { CreateDiagnosisRequestDto } from './dto/create-diagnosis-reqeust.dto';

import OpenAI from 'openai';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(DiagnosisModel)
    private readonly diagnosisRepository: Repository<DiagnosisModel>,
  ) {}

  public async readDiagnosisReports() {
    return this.diagnosisRepository.find();
  }

  public async readDiagnosisReportById(id: number) {
    const diagnosis = await this.diagnosisRepository.findOne({ where: { id } });
    if (!diagnosis)
      throw new NotFoundException(
        `${id} 에 해당하는 진단결과가 존재하지 않습니다`,
      );
    return diagnosis;
  }

  public async createDiagnosisReport(
    createDiagnosisReportRequestDto: CreateDiagnosisRequestDto,
  ) {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createDiagnosisReportRequestDto),
    });

    const result = (await response.json()) as { stroke_probability: string };

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
          ${result}
          여기 뇌졸중 관련 데이터와 예측된 뇌졸중 발병확률을 줄게
          이 데이터들을 사용해 종합 건강 진단 결과, 식습관 개선방안, 생활습관 개선방안을
          total_diagnosis, eating_habits, lifestyle_habits 프로퍼티값을 갖는 Json 으로 만들어줘
          각각 200자 이상으로 채워줘
      `,
        },
      ],
      model: 'gpt-3.5-turbo-16k',
    });

    const data = {
      ...JSON.parse(completion.choices[0].message.content),
      stroke_probability: parseFloat(result.stroke_probability.slice(0, -2)),
    };

    console.log(data);

    const newDiagnosis = await this.diagnosisRepository.create({
      score: 100 - data.stroke_probability,
      stroke_probability: data.stroke_probability,
      total_diagnosis: data.total_diagnosis,
      eating_habits: data.eating_habits,
      lifestyle_habits: data.lifestyle_habits,
    });

    console.log(newDiagnosis);

    return this.diagnosisRepository.save(newDiagnosis);
  }
}
