// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 使用 MongooseModule.forRoot() 連接 MongoDB。
    MongooseModule.forRoot('mongodb://localhost:27017/auth-db'),
    AuthModule,
  ],
})
export class AppModule {}
