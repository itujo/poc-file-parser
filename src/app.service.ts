import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { FileProcessingService } from 'src/file-processing.service';

@Injectable()
export class AppService {
  constructor(private readonly fileProcessingService: FileProcessingService) {}
  getHello() {
    const fileName = '10m.txt';
    const filePath = resolve('resources', fileName);
    return this.fileProcessingService.processFile(filePath);
  }
}
