import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisRequestDto } from './dto/create-diagnosis-reqeust.dto';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Get()
  public async readDiagnosisReports() {
    return this.diagnosisService.readDiagnosisReports();
  }

  @Get(':id')
  public async readDiagnosisReportById(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosisService.readDiagnosisReportById(id);
  }

  @Post()
  public async createDiagnosisReport(
    @Body() createDiagnosisReportRequestDto: CreateDiagnosisRequestDto,
  ) {}
}
