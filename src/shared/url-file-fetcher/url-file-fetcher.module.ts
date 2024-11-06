import { Module } from '@nestjs/common';
import { UrlFileFetcherService } from './url-file-fetcher.service';
import { UuidModule } from '../nest-ext/uuid/uuid.module';

@Module({
  imports: [UuidModule],
  providers: [UrlFileFetcherService],
  exports: [UrlFileFetcherService]
})
export class UrlFileFetcherModule { }
