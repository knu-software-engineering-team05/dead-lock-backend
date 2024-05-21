import { IsEnum, IsInt, IsString } from 'class-validator';
import { Gender } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({ message: 'userId 는 string 이어야 합니다' })
  @ApiProperty({ example: 'string', description: '로그인 아이디' })
  userId: string;

  @IsString({ message: 'userId 는 string 이어야 합니다' })
  @ApiProperty({ example: 'string', description: '로그인 비밀번호' })
  userPw: string;

  @IsInt({ message: 'age 는 정수이어야 합니다' })
  @ApiProperty({ example: 0, description: '나이' })
  age: number;

  @IsEnum(Gender, { message: 'Gender 는 MALE 또는 FEMALE 이어야 합니다' })
  @ApiProperty({ example: 'MALE', description: '성별' })
  gender: Gender;
}
