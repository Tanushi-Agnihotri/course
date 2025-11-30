import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module'; 
import { PrismaService } from '../prisma/prisma.service';
// import { UserController } from './user.controller';

@Module({
  // controllers: [UserController],
  imports: [PrismaModule],
  providers: [UserService, PrismaService],
})
export class UserModule {}
