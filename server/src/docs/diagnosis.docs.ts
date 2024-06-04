import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { DiagnosisReportResponseDto } from 'src/diagnosis/dto/diagnosis-response.dto';

export const ReadDiagnosisReportsDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: '진단결과 조회' }),
    ApiOkResponse({ description: 'OK', type: [DiagnosisReportResponseDto] }),
  );
};

export const ReadDiagnosisReportsByIdDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: '상세 진단결과 조회' }),
    ApiOkResponse({ description: 'OK', type: DiagnosisReportResponseDto }),
    ApiNotFoundResponse({ description: 'Not Found' }),
  );
};

export const CreateDiagnosisReportDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: '진단결과 생성' }),
    ApiCreatedResponse({ description: 'OK', type: DiagnosisReportResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
  );
};

export const DeleteDiagnosisReportDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: '진단결과 삭제' }),
    ApiCreatedResponse({ description: 'OK' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
  );
};
