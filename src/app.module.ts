import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { FileProcessingService } from './file-processing.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, FileProcessingService],
})
export class AppModule {}
