import { Module } from '@nestjs/common';
import { PdfManagerService } from './pdf-manager.service';
import { PathModule } from '../nest-ext/path/path.module';

@Module({
  imports: [PathModule],
  providers: [PdfManagerService],
  exports: [PdfManagerService]
})
export class PdfManagerModule { }
