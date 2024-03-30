import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import path, { extname } from 'path';
import { v4 } from 'uuid';
import { StorageManager } from '../storage-manager.service';

@Injectable()
export class LocalStorageService implements StorageManager {

    saveFile(buffer: Buffer, extension: string, destinationPath: string = path.resolve(`tmp`)): string | Promise<string> {
        const filename = v4();
        const outputDir = path.resolve(destinationPath);
        const output = `${outputDir}/${filename}${extension}`;

        if (!existsSync(destinationPath)) {
            mkdirSync(destinationPath, { recursive: true });
        }

        const writeStream = createWriteStream(output);
        writeStream.write(buffer);
        writeStream.end();
        return `${output}`;
    }

    readFile(dir: string): StreamableFile | Promise<StreamableFile> {
        const filepath = path.resolve(dir);
        const file = createReadStream(filepath);
        return new StreamableFile(file);
    }


    replaceFile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    moveFile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    deleteFile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}