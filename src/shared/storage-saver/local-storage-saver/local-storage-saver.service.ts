import { Injectable } from '@nestjs/common';
import { StorageSaver } from '../storage-saver.service';

@Injectable()
export class LocalStorageSaverService implements StorageSaver {
    saveFile(file: Express.Multer.File): string | Promise<string> {
        throw new Error('Method not implemented.');
    }
}