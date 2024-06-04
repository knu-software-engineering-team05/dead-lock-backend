import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headerAuthField = request.headers.authorization;

    const token = await this.authService.extractToken(headerAuthField);
    const decodedToken = await this.authService.verifyToken(token);

    const user = await this.usersService.readUserByUserId(
      decodedToken.userId,
      true,
    );

    console.log(user, token, decodedToken);

    request.user = user;
    request.token = token;
    request.tokenType = decodedToken.type;

    return true;
  }
}
