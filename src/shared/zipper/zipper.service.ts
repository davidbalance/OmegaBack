import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import archiver from 'archiver';
import path from 'path';
import { PassThrough } from 'stream';

@Injectable()
export class ZipperService {
    public async zip(sources: string[]): Promise<StreamableFile> {

        const inputSources = sources.map((source: string) => ({
            stream: createReadStream(source),
            name: path.basename(source)
        }));

        const outputStream = new PassThrough();
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        archive.on('warning', (err) => {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(outputStream);
        for (const source of inputSources) {
            archive.append(source.stream, { name: source.name });
        }

        archive.finalize();
        return new StreamableFile(outputStream);
    }
}
