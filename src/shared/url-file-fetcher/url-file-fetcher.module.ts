import { Module } from '@nestjs/common';
import { UrlFileFetcherService } from './url-file-fetcher.service';
import { NestUuidModule } from '../nest-ext/nest-uuid/nest-uuid.module';

@Module({
  imports: [NestUuidModule],
  providers: [UrlFileFetcherService],
  exports: [UrlFileFetcherService]
})
export class UrlFileFetcherModule { }
