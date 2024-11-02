import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { StorageManager } from '../storage-manager.service';
import { NEST_PATH } from '@/shared/nest-ext/nest-path/inject-token';
import { NestPath } from '@/shared/nest-ext/nest-path/nest-path.type';
import { NEST_FS } from '@/shared/nest-ext/nest-fs/inject-token';
import { NestFS } from '@/shared/nest-ext/nest-fs/nest-fs.type';
import { ReadStream } from 'fs';
import { NEST_UUID } from '@/shared/nest-ext/nest-uuid/inject-token';
import { NestUuid } from '@/shared/nest-ext/nest-uuid/nest-uuid.type';

@Injectable()
export class LocalStorageService implements StorageManager {

    constructor(
        @Inject(NEST_PATH) private readonly path: NestPath,
        @Inject(NEST_FS) private readonly fs: NestFS,
        @Inject(NEST_UUID) private readonly uuid: NestUuid,
    ) { }

    saveFile(buffer: Buffer, extension: string, destinationPath: string = this.path.resolve(`tmp`), filename?: string): Promise<string> {
        const newFilename = filename ?? this.uuid.v4();
        const outputDir = this.path.resolve(destinationPath);
        const output = this.path.join(outputDir, `${newFilename}${extension}`);

        if (!this.fs.existsSync(destinationPath)) {
            this.fs.mkdirSync(destinationPath, { recursive: true });
        }

        return new Promise((resolve, reject) => {
            const writeStream = this.fs.createWriteStream(output);
            writeStream.on('error', (err) => {
                reject(err);
            });
            writeStream.write(buffer);
            writeStream.end();
            resolve(output);
        });
    }

    readFile(dir: string): ReadStream | Promise<ReadStream> {
        const filepath = this.path.resolve(dir);
        if (!this.fs.existsSync(filepath)) {
            Logger.error(`File not found: ${dir}`);
            throw new NotFoundException(['File not found', filepath]);
        }
        try {
            const file = this.fs.createReadStream(filepath);
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
        const filepath = this.path.resolve(dir);
        if (!this.fs.existsSync(filepath)) {
            Logger.error(`File not found: ${dir}`);
            throw new NotFoundException(['File not found', filepath]);
        }
        try {
            this.fs.unlinkSync(filepath);
            return true;
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}