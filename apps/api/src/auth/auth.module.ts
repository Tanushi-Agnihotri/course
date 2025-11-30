import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SESSION_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule { }
