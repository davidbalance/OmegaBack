import { Module, Provider } from '@nestjs/common';
import { INJECT_STORAGE_MANAGER } from '../storage-manager.service';
import { LocalStorageService } from './local-storage.service';
import { NestUuidModule } from '@/shared/nest-ext/nest-uuid/nest-uuid.module';
import { NestPathModule } from '@/shared/nest-ext/nest-path/nest-path.module';
import { NestFSModule } from '@/shared/nest-ext/nest-fs/nest-fs.module';

const StorageProvider: Provider = { provide: INJECT_STORAGE_MANAGER, useClass: LocalStorageService }

@Module({
  imports: [
    NestUuidModule,
    NestPathModule,
    NestFSModule
  ],
  providers: [StorageProvider],
  exports: [StorageProvider]
})
export class LocalStorageModule { }
