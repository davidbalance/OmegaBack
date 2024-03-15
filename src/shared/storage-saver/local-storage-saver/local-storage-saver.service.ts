import { Injectable } from '@nestjs/common';
import { StorageSaver } from '../storage-saver.service';
import { createReadStream, createWriteStream } from 'fs';
import { extname } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class LocalStorageSaverService implements StorageSaver {
    saveFile(file: Express.Multer.File): string | Promise<string>;
    saveFile(file: Express.Multer.File, dir: string): string | Promise<string>;
    saveFile(file: Express.Multer.File, dir: string = "tmp"): string | Promise<string> {
        const extension = extname(file.originalname);
        const filename = v4();
        const fileStream = createReadStream(`${file.path}/${filename}${extension}`);
        const writeStream = createWriteStream(dir);
        fileStream.pipe(writeStream);

        return new Promise<string>((resolve, reject) => {
            writeStream.on('finish', () => resolve(`${filename}${extension}`));
            writeStream.on('error', (error) => reject(error));
        });
    }
}