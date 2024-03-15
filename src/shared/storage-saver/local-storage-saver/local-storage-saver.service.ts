import { Injectable } from '@nestjs/common';
import { StorageSaver } from '../storage-saver.service';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import path, { extname } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class LocalStorageSaverService implements StorageSaver {
    saveFile(file: Express.Multer.File): string | Promise<string>;
    saveFile(file: Express.Multer.File, dir: string): string | Promise<string>;
    saveFile(file: Express.Multer.File, dir: string = path.resolve(`tmp`)): string | Promise<string> {
        const extension = extname(file.originalname);
        const filename = v4();
        const destination = `${dir}/${filename}${extension}`;

        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        const writeStream = createWriteStream(destination);
        writeStream.write(file.buffer);
        return `${filename}${extension}`;
    }
}