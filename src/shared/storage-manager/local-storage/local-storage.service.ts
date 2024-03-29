import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import path, { extname } from 'path';
import { v4 } from 'uuid';
import { StorageManager } from '../storage-manager.service';

@Injectable()
export class LocalStorageService implements StorageManager {
    replaceFile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    moveFile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    deleteFile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
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