import { Module, Provider } from '@nestjs/common';
import { INJECT_STORAGE_MANAGER } from '../storage-manager.service';
import { LocalStorageService } from './local-storage.service';

const StorageProvider: Provider = { provide: INJECT_STORAGE_MANAGER, useClass: LocalStorageService }

@Module({
  providers: [StorageProvider],
  exports: [StorageProvider]
})
export class LocalStorageModule { }
