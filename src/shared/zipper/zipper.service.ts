import { Injectable, StreamableFile } from '@nestjs/common';
import { ZipOptions } from './zipper.interface';
import dayjs from 'dayjs';
import { createReadStream, createWriteStream } from 'fs';
import archiver from 'archiver';
import path from 'path';

@Injectable()
export class ZipperService {
    public zip(sources: string[], options?: ZipOptions): StreamableFile {
        const outputPath: string = this.getZipname(options.name);

        const inputSources = sources.map((source: string) => ({
            stream: createReadStream(source),
            name: source.split('/').pop()
        }));

        const outputStream = createWriteStream(outputPath);
        const archive = archiver('zip', {
            zlib: {
                level: 9
            }
        });

        archive.pipe(outputStream);
        for (const source of inputSources) {
            archive.append(source.stream, { name: source.name });
        }
        archive.finalize();

        const streamableFile = this.getStreamableFile(outputPath);
        return streamableFile;
    }

    private getZipname(name?: string): string {
        const output: string = name ?? dayjs().toISOString();
        const outputFolder: string = path.resolve('static/zip');
        const outputPath: string = path.join(outputFolder, output);
        return outputPath;
    }

    private getStreamableFile(path: string): StreamableFile {
        const readStream = createReadStream(path);
        return new StreamableFile(readStream);
    }


}
