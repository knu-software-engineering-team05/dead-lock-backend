import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokenResponseDto } from 'src/auth/dto/token-response.dto';

export const SignUpDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: '회원가입', description: '회원가입을 진행합니다' }),
    ApiCreatedResponse({
      description: 'OK',
      type: TokenResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: BadRequestException,
    }),
  );
};

export const SignInDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: '로그인', description: '로그인을 진행합니다' }),
    ApiCreatedResponse({
      description: 'OK',
      type: TokenResponseDto,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: UnauthorizedException,
    }),
    ApiNotFoundResponse({
      description: 'Not found',
      type: NotFoundException,
    }),
  );
};

export const ReissueDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'access 토큰 재발급',
      description: 'access 토큰을 재발급합니다',
    }),
    ApiCreatedResponse({
      description: 'OK',
      type: TokenResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'access 토큰 재발급은 refresh 토큰으로만 가능합니다',
      type: BadRequestException,
    }),
  );
};
