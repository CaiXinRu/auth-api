import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, 'secret');
      if (this.authService.isTokenBlacklisted(token)) {
        throw new UnauthorizedException('Token is blacklisted');
      }
      request.user = decoded; // 把解析過的使用者資訊塞進 request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
