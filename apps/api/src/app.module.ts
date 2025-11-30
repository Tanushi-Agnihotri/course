import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import { CourseModule } from './course/course.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CourseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
