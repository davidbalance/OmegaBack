import { Module } from '@nestjs/common';
import { LocalIncrementProvider } from './local-increment.service';
import { IncrementProviderToken } from '@shared/shared/nest/inject';

@Module({
  providers: [
    LocalIncrementProvider
  ],
  exports: [
    IncrementProviderToken
  ],
})
export class LocalIncrementModule { }
