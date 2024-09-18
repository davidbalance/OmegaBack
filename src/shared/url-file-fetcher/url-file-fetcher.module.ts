import { Module } from '@nestjs/common';
import { UrlFileFetcherService } from './url-file-fetcher.service';

@Module({
  providers: [UrlFileFetcherService],
  exports: [UrlFileFetcherService]
})
export class UrlFileFetcherModule { }
