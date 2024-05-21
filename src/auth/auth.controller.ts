import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { SignInDocs, SignUpDocs } from 'src/docs/auth.docs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @SignInDocs()
  public async signIn(@Body() signInRequestDto: SignInRequestDto) {
    return this.authService.signIn(signInRequestDto);
  }

  @Post('signup')
  @SignUpDocs()
  public async signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.authService.signUp(signUpRequestDto);
  }
}
