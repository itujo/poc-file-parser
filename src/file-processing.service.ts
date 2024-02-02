import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as fs from 'fs';
import * as readline from 'readline';

type Line = {
  number: string;
  order: number;
};

@Injectable()
export class FileProcessingService {
  private readonly logger = new Logger(FileProcessingService.name);

  constructor(private readonly prisma: PrismaService) {}

  async processFile(filePath: string): Promise<void> {
    console.time('processFile');
    this.logger.debug(`Starting to process file: ${filePath}`);

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let order = 1;
    const batch: Line[] = [];

    for await (const line of rl) {
      batch.push({ number: line.trim(), order });
      order++;
    }

    // Insere qualquer registro restante
    if (batch.length > 0) {
      await this.insertBatch(batch);
    }

    console.timeEnd('processFile');
    this.logger.debug('Finished file processing');
  }

  private async insertBatch(batch: Line[]): Promise<void> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.tabelaFinal.createMany({ data: batch });
      });
    } catch (error) {
      this.logger.error('Error inserting batch', error);
      throw error;
    }
  }
}
