import { Module } from '@nestjs/common';
import { PdfManagerService } from './pdf-manager.service';

@Module({
  providers: [PdfManagerService],
  exports: [PdfManagerService]
})
export class PdfManagerModule { }
