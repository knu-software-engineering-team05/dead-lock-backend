import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  HASH_ROUNDS,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  TokenType,
} from 'src/config/jwt.config';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private async signToken(
    userPk: number,
    userId: string,
    tokenType: TokenType,
  ) {
    const payload = {
      id: userPk,
      userId,
      type: TokenType,
    };

    return this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN(tokenType),
    });
  }

  private async getToken(userPk: number, userId: string) {
    return new TokenResponseDto(
      await this.signToken(userPk, userId, TokenType.ACCESS),
      await this.signToken(userPk, userId, TokenType.REFRESH),
    );
  }

  private async authenticateUser(userId: string, userPw: string) {
    const user = await this.usersService.readUserByUserId(userId);
    const isPwCorrect = await bcrypt.compare(userPw, user.userPw);

    if (!isPwCorrect)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');

    return user;
  }

  public async signUp(signUpDto: SignUpRequestDto) {
    const hashedPw = await bcrypt.hash(signUpDto.userPw, HASH_ROUNDS);

    const newUser = await this.usersService.createUser({
      ...signUpDto,
      userPw: hashedPw,
    });

    return this.getToken(newUser.userPk, newUser.userId);
  }

  public async signIn(signInDto: SignInRequestDto) {
    const user = await this.authenticateUser(
      signInDto.userId,
      signInDto.userPw,
    );
    return this.getToken(user.userPk, user.userId);
  }
}
