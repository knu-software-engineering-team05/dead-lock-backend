import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenGuard } from './token.guard';
import { TokenType } from 'src/config/jwt.config';

@Injectable()
export class AccessTokenGuard extends TokenGuard {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();

    if (request.tokenType !== TokenType.ACCESS)
      throw new UnauthorizedException('Access Toeken 이 아닙니다');

    return true;
  }
}
