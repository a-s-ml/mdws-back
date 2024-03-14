import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithAuth } from 'src/types/types';

@Injectable()
export class ControllerAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: RequestWithAuth = context.switchToHttp().getRequest();

    const { accessToken } = request.body;

    try {
      const payload = this.jwtService.verify(accessToken);
      request.name = payload.sub;
      request.chat = payload.chat;
      request.user = payload.user;
      return true;
    } catch {
      throw new ForbiddenException('Invalid authorization token');
    }
  }
}
