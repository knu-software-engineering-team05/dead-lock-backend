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
    Object.keys(diagnosisReport).forEach((key) => {
      this[key] = diagnosisReport[key];
    });
  }
}
