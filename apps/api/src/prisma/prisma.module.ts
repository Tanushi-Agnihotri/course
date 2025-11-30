import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],   // register service
  exports: [PrismaService],     // make it usable in other modules
})
export class PrismaModule {}
