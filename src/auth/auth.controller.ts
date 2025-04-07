import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // 接收 email 和 password，呼叫 AuthService.register() 註冊使用者。
  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  // 接收 email 和 password，呼叫 AuthService.login() 來驗證並返回 JWT。
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('logout')
  logout(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      return { message: 'No token provided' };
    }
    const token = authHeader.replace('Bearer ', '');
    return this.authService.logout(token);
  }
}
