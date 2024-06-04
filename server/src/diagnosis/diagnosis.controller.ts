import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisRequestDto } from './dto/create-diagnosis-reqeust.dto';
import { AccessTokenGuard } from 'src/auth/utils/access-token.guard';
import { User } from 'src/users/utils/user.decorator';
import {
  CreateDiagnosisReportDocs,
  DeleteDiagnosisReportDocs,
  ReadDiagnosisReportsByIdDocs,
  ReadDiagnosisReportsDocs,
} from 'src/docs/diagnosis.docs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('뇌졸중 진단')
@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @ReadDiagnosisReportsDocs()
  public async readDiagnosisReports(@User() user) {
    return this.diagnosisService.readDiagnosisReports(user);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ReadDiagnosisReportsByIdDocs()
  public async readDiagnosisReportById(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.diagnosisService.readDiagnosisReportById(id, user);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @CreateDiagnosisReportDocs()
  public async createDiagnosisReport(
    @User() user,
    @Body() createDiagnosisReportRequestDto: CreateDiagnosisRequestDto,
  ) {
    return this.diagnosisService.createDiagnosisReport(
      user,
      createDiagnosisReportRequestDto,
    );
  }

  @Delete(':id')
  @UseGuards()
  @DeleteDiagnosisReportDocs()
  public async deleteDiagnosisReport(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.diagnosisService.deleteDiagnosisReport(id, user);
  }
}
