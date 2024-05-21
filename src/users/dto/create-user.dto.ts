import { IsEnum, IsInt, IsString } from 'class-validator';
import { Gender } from '../entities/user.entity';

export class CreateUserDto {
  @IsString({ message: 'userId 는 string 이어야 합니다' })
  userId: string;

  @IsString({ message: 'userId 는 string 이어야 합니다' })
  userPw: string;

  @IsInt({ message: 'age 는 정수이어야 합니다' })
  age: number;

  @IsEnum(Gender, { message: 'Gender 는 MALE 또는 FEMALE 이어야 합니다' })
  gender: Gender;
}
