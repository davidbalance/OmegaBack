import { Injectable, InternalServerErrorException, Logger, NotFoundException, StreamableFile } from '@nestjs/common';
import { createReadStream, createWriteStream, existsSync, mkdirSync, ReadStream, unlinkSync } from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { StorageManager } from '../storage-manager.service';

@Injectable()
export class LocalStorageService implements StorageManager {

    saveFile(buffer: Buffer, extension: string, destinationPath: string = path.resolve(`tmp`), filename?: string): Promise<string> {
        const newFilename = filename ?? v4();
        const outputDir = path.resolve(destinationPath);
        const output = path.join(outputDir, `${newFilename}${extension}`);

        if (!existsSync(destinationPath)) {
            mkdirSync(destinationPath, { recursive: true });
        }

        return new Promise((resolve, reject) => {
            const writeStream = createWriteStream(output);
            writeStream.on('error', (err) => {
                reject(err);
            });
            writeStream.write(buffer);
            writeStream.end();
            resolve(output);
        });
    }

    readFile(dir: string): ReadStream | Promise<ReadStream> {
        const filepath = path.resolve(dir);
        if (!existsSync(filepath)) {
            Logger.error(`File not found: ${dir}`);
            throw new NotFoundException(['File not found', filepath]);
        }
        try {
            const file = createReadStream(filepath);
            file.on('data', (chunk) => Logger.debug(chunk));
            file.on('end', () => Logger.debug(`Reading of file '${filepath}' was closed`));
            file.on('error', (err) => Logger.error(err));
            return file;
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    replaceFile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    moveFile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async deleteFile(dir: string): Promise<boolean> {
        const filepath = path.resolve(dir);
        if (!existsSync(filepath)) {
            Logger.error(`File not found: ${dir}`);
            throw new NotFoundException(['File not found', filepath]);
        }
        try {
            unlinkSync(filepath);
            return true;
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}