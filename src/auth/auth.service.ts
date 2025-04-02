import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // 呼叫 UsersService.createUser() 來建立新使用者。
  async register(email: string, password: string) {
    return this.usersService.createUser(email, password);
  }

  async login(email: string, password: string) {

    // 先透過 findByEmail() 檢查使用者是否存在。
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    // 使用 bcrypt.compare() 驗證密碼是否正確。
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // 使用 jsonwebtoken 產生 JWT，回傳給前端。
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
    return { token };
  }
}
