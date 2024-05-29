import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisRequestDto } from './dto/create-diagnosis-reqeust.dto';
import { AccessTokenGuard } from 'src/auth/utils/access-token.guard';
import { User } from 'src/users/utils/user.decorator';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  public async readDiagnosisReports(@User() user) {
    return this.diagnosisService.readDiagnosisReports(user);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  public async readDiagnosisReportById(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.diagnosisService.readDiagnosisReportById(id, user);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  public async createDiagnosisReport(
    @User() user,
    @Body() createDiagnosisReportRequestDto: CreateDiagnosisRequestDto,
  ) {
    return this.diagnosisService.createDiagnosisReport(
      user,
      createDiagnosisReportRequestDto,
    );
  }
}
