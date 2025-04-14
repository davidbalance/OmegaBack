import { Module } from '@nestjs/common';
import { LocalSpreadsheetProvider } from './local-spreadsheet.service';
import { SpreadSheetProviderToken } from '@shared/shared/nest/inject';

@Module({
  providers: [
    LocalSpreadsheetProvider
  ],
  exports: [
    SpreadSheetProviderToken
  ],
})
export class LocalSpreadsheetModule { }
