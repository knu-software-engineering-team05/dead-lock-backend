import { ApiProperty } from '@nestjs/swagger';

export class DiagnosisReportResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2024-06-05' })
  createdAt: string;

  @ApiProperty({ example: 0 })
  score: number;

  @ApiProperty({ example: 0 })
  strokeProbability: number;

  @ApiProperty({ example: '진단결과' })
  totalDiagnosis: string;

  @ApiProperty({ example: '식습관 개선방안' })
  eatingHabits: string;

  @ApiProperty({ example: '생활습관 개선방안' })
  lifestyleHabits: string;

  constructor(diagnosisReport) {
    this.id = diagnosisReport.id;
    this.createdAt = diagnosisReport.createdAt;
    this.score = diagnosisReport.score;
    this.strokeProbability = diagnosisReport.stroke_probability;
    this.totalDiagnosis = diagnosisReport.total_diagnosis;
    this.eatingHabits = diagnosisReport.eating_habits;
    this.lifestyleHabits = diagnosisReport.lifestyle_habits;
  }
}
