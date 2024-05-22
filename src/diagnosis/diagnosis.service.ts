import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosisModel } from './entities/diagnosis.entity';

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

  public async createDiagnosisReport() {
    // TODO: AI Server 로 요청날려 건강점수 및 뇌졸중 발병확률 측정
    // TODO: CHAT GPT API 를 활용하여 종합진단 결과 및 식습관, 생활습관 개선 프로그램 응답
    // TODO: DB 에 저장
  }
}
