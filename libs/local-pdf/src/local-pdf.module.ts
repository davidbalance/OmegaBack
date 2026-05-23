import { Module } from '@nestjs/common';
import { LocalPdfProvider } from './local-pdf.service';
import { pdfFactory, PdfToken } from './local-pdf.dependencies';
import { PdfProviderToken } from '@shared/shared/nest/inject';
import { PathModule, PathToken } from '@shared/shared/common';

@Module({
  imports: [PathModule],
  providers: [
    {
      provide: PdfToken,
      useFactory: pdfFactory,
      inject: [PathToken]
    },
    LocalPdfProvider
  ],
  exports: [
    PdfProviderToken
  ],
})
export class LocalPdfModule { }
