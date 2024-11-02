import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { PassThrough, Stream } from 'stream';
import { NEST_ARCHIVER } from '../nest-ext/nest-archiver/inject-token';
import { NestArchiver } from '../nest-ext/nest-archiver/nest-archiver.type';
import { NEST_PATH } from '../nest-ext/nest-path/inject-token';
import { NestPath } from '../nest-ext/nest-path/nest-path.type';
import { NEST_FS } from '../nest-ext/nest-fs/inject-token';
import { NestFS } from '../nest-ext/nest-fs/nest-fs.type';

@Injectable()
export class ZipperService {

    constructor(
        @Inject(NEST_ARCHIVER) private readonly archiver: NestArchiver,
        @Inject(NEST_PATH) private readonly path: NestPath,
        @Inject(NEST_FS) private readonly fs: NestFS,
    ) { }

    public async zip(sources: (string | { source: string, name: string })[]): Promise<Stream> {
        const outputStream = new PassThrough();

        const inputSources = sources.map((source: string | { source: string, name: string }) => ({
            stream: this.fs.createReadStream(typeof source === 'string' ? source : source.source),
            name: typeof source === 'string' ? this.path.basename(source) : source.name,
        }));

        this.archiver.on('warning', (err) => {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        });

        this.archiver.on('error', (err) => {
            throw err;
        });

        this.archiver.pipe(outputStream);
        for (const source of inputSources) {
            this.archiver.append(source.stream, { name: source.name });
        }

        this.archiver.finalize();
        return outputStream;
    }
}
