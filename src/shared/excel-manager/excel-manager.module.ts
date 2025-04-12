import { Module } from '@nestjs/common';
import { ExcelManagerService } from './excel-manager.service';

@Module({
  providers: [
    ExcelManagerService
  ],
  exports: [
    ExcelManagerService
  ]
})
export class ExcelManagerModule { }
