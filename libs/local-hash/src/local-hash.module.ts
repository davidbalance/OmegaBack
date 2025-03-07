import { Module } from '@nestjs/common';
import { LocalHashProvider } from './local-hash.service';
import { HashToken, HashValue } from './local-hash.dependencies';
import { PasswordProviderToken } from '@shared/shared/nest/inject';

@Module({
  providers: [
    {
      provide: HashToken,
      useValue: HashValue
    },
    LocalHashProvider
  ],
  exports: [PasswordProviderToken],
})
export class LocalHashModule { }
