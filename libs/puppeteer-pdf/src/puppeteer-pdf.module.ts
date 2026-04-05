import { Module } from '@nestjs/common';
import { PuppeteerPdfProvider } from './puppeteer-pdf.service';
import { PdfProviderToken } from '@shared/shared/nest/inject';

@Module({
  providers: [PuppeteerPdfProvider],
  exports: [PdfProviderToken],
})
export class PuppeteerPdfModule { }
