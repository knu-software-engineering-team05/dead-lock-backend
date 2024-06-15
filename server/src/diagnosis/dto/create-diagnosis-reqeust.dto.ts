import { IsBoolean, IsEnum, IsNumber } from 'class-validator';
import {
  JobType,
  ResidenceType,
  SmokeType,
} from '../entities/diagnosis.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiagnosisRequestDto {
  @IsBoolean()
  married: boolean;

  @IsEnum(JobType, {
    message:
      'jobType 은 PRIVATE, SELF_EMPLOYED, GOVT_JOB, CHILDREN, NEVER_WORKED 중 하나여야 합니다',
  })
  @ApiProperty({ example: 'JOB_TYPE' })
  jobType: JobType;

  @IsEnum(ResidenceType, {
    message: 'residenceType 은 URBAN 또는 RURAL 중 하나여야 합니다',
  })
  @ApiProperty({ example: 'ResidenceType' })
  residenceType: ResidenceType;

  @IsBoolean({ message: 'highBloodPressure 는 boolean 값이어야 합니다' })
  @ApiProperty({ example: true })
  highBloodPressure: boolean;

  @IsBoolean({ message: 'heartDisease 는 boolean 값이어야 합니다' })
  @ApiProperty({ example: true })
  heartDisease: boolean;

  @IsNumber()
  @ApiProperty({ example: 0 })
  bloodSugarLevel: number;

  @IsNumber()
  @ApiProperty({ example: 0 })
  bmi: number;

  @IsEnum(SmokeType, {
    message: 'smokeType 은 FORMERLY, NEVER, SMOKES, UNKNOWN 중 하나여야 합니다',
  })
  @ApiProperty({ example: 'SmokeType' })
  smokeType: SmokeType;
}
