import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisModel } from './entities/diagnosis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosisModel])],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
