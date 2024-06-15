import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

export interface ITokenPayload {
  userPk: number;
  userId: string;
  type: TokenType;
}

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
      type: tokenType,
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

  public async verifyToken(token: string): Promise<ITokenPayload> {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_SECRET,
      });
    } catch (err) {
      throw new BadRequestException('ACCESS 토큰이 만료되었습니다');
    }
  }

  public async extractToken(headerAuthField: string) {
    try {
      const splittedToken = headerAuthField.split(' ');
      if (splittedToken.length !== 2) throw new Error();
      return splittedToken[1];
    } catch (err) {
      throw new UnauthorizedException('토큰이 없거나 잘못된 형식의 토큰입니다');
    }
  }

  private async authenticateUser(userId: string, userPw: string) {
    const user = await this.usersService.readUserByUserId(userId, true);
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

  public async reissueToken(refreshToken: string) {
    const decodedToken = await this.verifyToken(refreshToken);

    if (decodedToken.type !== TokenType.REFRESH) {
      throw new BadRequestException(
        'Access Token 재발급은 Refresh Token 으로만 가능합니다',
      );
    }
    return this.signToken(
      decodedToken.userPk,
      decodedToken.userId,
      TokenType.ACCESS,
    );
  }
}
