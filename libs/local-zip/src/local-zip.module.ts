import { Module } from '@nestjs/common';
import { ZipperProvider } from './local-zip.service';
import { ZipToken, ZipValue } from './local-zip.dependency';
import { ZipperProviderToken } from '@shared/shared/nest/inject';

@Module({
  providers: [
    {
      provide: ZipToken,
      useValue: ZipValue
    },
    ZipperProvider
  ],
  exports: [ZipperProviderToken],
})
export class LocalZipModule { }
