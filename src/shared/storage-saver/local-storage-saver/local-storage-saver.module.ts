import { Module, Provider } from '@nestjs/common';
import { LocalStorageSaverService } from './local-storage-saver.service';
import { StorageSaver } from '../storage-saver.service';

const StorageProvider: Provider = { provide: StorageSaver, useClass: LocalStorageSaverService }

@Module({
  providers: [StorageProvider],
  exports: [StorageProvider]
})
export class LocalStorageSaverModule { }
