import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosisModel } from './entities/diagnosis.entity';
import { CreateDiagnosisRequestDto } from './dto/create-diagnosis-reqeust.dto';

import { UserModel } from 'src/users/entities/user.entity';
import { calculateAge } from './utils/calculateAge';
import { DiagnosisReportResponseDto } from './dto/diagnosis-response.dto';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(DiagnosisModel)
    private readonly diagnosisRepository: Repository<DiagnosisModel>,
    private readonly openAIService: OpenaiService,
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

    const improvementReport = await this.createImprovementReport(
      predictedStrokeProbability,
      createDiagnosisReportRequestDto,
    );

    const newReport = {
      score: 100 - predictedStrokeProbability,
      strokeProbability: predictedStrokeProbability,
      totalDiagnosis: improvementReport.total_diagnosis,
      eatingHabits: improvementReport.eating_habits,
      lifestyleHabits: improvementReport.lifestyle_habits,
      user: user,
    };

    const diagnosisReport = await this.diagnosisRepository.save(newReport);

    return new DiagnosisReportResponseDto(diagnosisReport);
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
    const response = await fetch('http://127.0.0.1:5000/predict', {
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
    return this.openAIService.createImprovementReport(
      predictedStrokeProbability,
      createDiagnosisReportRequestDto,
    );
  }
}
