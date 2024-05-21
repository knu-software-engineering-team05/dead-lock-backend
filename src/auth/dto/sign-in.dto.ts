import { IsString } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'userId 는 string 이어야 합니다' })
  userId: string;
  @IsString({ message: 'userPw 는 string 이어야 합니다' })
  userPw: string;
}
