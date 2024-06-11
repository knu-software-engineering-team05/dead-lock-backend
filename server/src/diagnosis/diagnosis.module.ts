import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisModel } from './entities/diagnosis.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiagnosisModel]),
    AuthModule,
    UsersModule,
    OpenaiModule,
  ],
  exports: [DiagnosisService],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
