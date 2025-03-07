import { Inject, Injectable, Logger, Provider } from '@nestjs/common';
import { FileProviderToken } from '@shared/shared/nest/inject';
import { DiskToken } from './local-file.dependencies';
import { FileNotFoundError, FileOperation } from '@shared/shared/providers';
import { FileToken, FileType, PathToken, PathType } from '@shared/shared/common';
import { StorageError } from '@shared/shared/domain/error';

@Injectable()
export class LocalFileService implements FileOperation {
    constructor(
        @Inject(FileToken) private readonly file: FileType,
        @Inject(PathToken) private readonly path: PathType,
        @Inject(DiskToken) private readonly diskPath: string,
    ) { }

    async write(filepath: string, filename: string, buffer: Buffer | ArrayBuffer): Promise<string> {
        const outputPath = this.path.join(this.diskPath, filepath);
        if (!this.file.existsSync(outputPath)) {
            this.file.mkdirSync(outputPath, { recursive: true });
        }

        const output = this.path.join(outputPath, filename);
        const savedPath = this.path.join(filepath, filename);

        return new Promise<string>((resolve, reject) => {
            const writeStream = this.file.createWriteStream(output);
            writeStream.on('error', (err) => {
                Logger.error(err);
                reject(new StorageError('Fail to save file.'));
            });
            writeStream.write(buffer);
            writeStream.end();
            resolve(savedPath);
        });
    }

    async read(filepath: string): Promise<Buffer> {
        const readpath = this.path.join(this.diskPath, filepath);
        if (!this.file.existsSync(readpath)) {
            throw new FileNotFoundError(readpath);
        }

        return new Promise<Buffer>((resolve, reject) => {
            try {
                const buffer = this.file.readFileSync(readpath);
                resolve(buffer);
            } catch (error) {
                Logger.error(error);
                reject(new StorageError('Error reading the file.'))
            }
        });

    }

    async remove(filepath: string): Promise<void> {
        const readpath = this.path.join(this.diskPath, filepath);
        if (!this.file.existsSync(readpath)) {
            throw new FileNotFoundError(readpath,);
        }

        return new Promise<void>((resolve, reject) => {
            try {
                this.file.unlinkSync(readpath);
                resolve();
            } catch (error) {
                Logger.error(error);
                reject(new StorageError('Error unlinking the file.'))
            }
        });
    }
}

export const LocalFileProvider: Provider = {
    provide: FileProviderToken,
    useClass: LocalFileService
}
