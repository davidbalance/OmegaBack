import { Module } from '@nestjs/common';
import { LocalFileProvider } from './local-file.service';
import { DiskToken, loadDisk, } from './local-file.dependencies';
import { FileProviderToken } from '@shared/shared/nest/inject';
import { FSModule, PathModule, PathToken } from '@shared/shared/common';

@Module({
  imports: [FSModule, PathModule],
  providers: [
    {
      provide: DiskToken,
      useFactory: loadDisk,
      inject: [PathToken]
    },
    LocalFileProvider
  ],
  exports: [FileProviderToken],
})
export class LocalFileModule { }
