import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ← 註冊 User model 給這個 module 用
  ],
  providers: [AuthService, UsersService], // ← 這裡注入你自己寫的 service（包含 auth 和 user）
  controllers: [AuthController], // ← 控制器：註冊 login logout getUsers 都寫在這
})
export class AuthModule {}
