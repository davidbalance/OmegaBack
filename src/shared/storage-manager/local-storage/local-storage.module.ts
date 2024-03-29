import { Module, Provider } from '@nestjs/common';
import { StorageManager } from '../storage-manager.service';
import { LocalStorageService } from './local-storage.service';

const StorageProvider: Provider = { provide: StorageManager, useClass: LocalStorageService }

@Module({
  providers: [StorageProvider],
  exports: [StorageProvider]
})
export class LocalStorageModule { }
