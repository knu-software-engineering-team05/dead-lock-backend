import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { ReissueDocs, SignInDocs, SignUpDocs } from 'src/docs/auth.docs';
import { ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';
import { RefreshTokenGuard } from './utils/refresh-token.guard';

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

  @Post('reissue')
  @UseGuards(RefreshTokenGuard)
  @ReissueDocs()
  public async reissueToken(@Headers('authorization') headerAuthField: string) {
    const refreshToken = await this.authService.extractToken(headerAuthField);
    const newAccessToken = await this.authService.reissueToken(refreshToken);

    return new TokenResponseDto(newAccessToken, refreshToken);
  }
}
