import { Module } from '@nestjs/common';
import { PuppeteerPdfProvider } from './puppeteer-pdf.service';
import { PdfProviderToken } from '@shared/shared/nest/inject';
import { ConfigModule } from '@nestjs/config';
import { ZodValidatorFactory } from '@shared/shared/nest/factories';
import puppeteerPdfConfig from './config/puppeteer-pdf.config';
import puppeteerPdfSchema from './config/puppeteer-pdf.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: ZodValidatorFactory(puppeteerPdfSchema),
      load: [puppeteerPdfConfig]
    }),
  ],
  providers: [PuppeteerPdfProvider],
  exports: [PdfProviderToken],
})
export class PuppeteerPdfModule { }
