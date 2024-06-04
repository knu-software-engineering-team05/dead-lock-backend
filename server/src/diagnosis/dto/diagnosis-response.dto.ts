import { ApiProperty } from '@nestjs/swagger';

export class DiagnosisReportResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2024-06-05' })
  createdAt: string;

  @ApiProperty({ example: 0 })
  score: number;

  @ApiProperty({ example: 0 })
  stroke_probability: number;

  @ApiProperty({ example: '진단결과' })
  total_diagnosis: string;

  @ApiProperty({ example: '식습관 개선방안' })
  eating_habits: string;

  @ApiProperty({ example: '생활습관 개선방안' })
  lifestyle_habits: string;

  constructor(diagnosisReport) {
    this.id = diagnosisReport.id;
    this.createdAt = diagnosisReport.createdAt;
    this.score = diagnosisReport.score;
    this.stroke_probability = diagnosisReport.stroke_probability;
    this.total_diagnosis = diagnosisReport.total_diagnosis;
    this.eating_habits = diagnosisReport.eating_habits;
    this.lifestyle_habits = diagnosisReport.lifestyle_habits;
  }
}
