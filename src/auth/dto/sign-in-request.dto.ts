import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequestDto {
  @IsString({ message: 'userId 는 string 이어야 합니다' })
  @ApiProperty({ example: 'string', description: '로그인 아이디' })
  userId: string;

  @IsString({ message: 'userPw 는 string 이어야 합니다' })
  @ApiProperty({ example: 'string', description: '로그인 비밀번호' })
  userPw: string;
}
