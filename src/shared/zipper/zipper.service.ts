import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassThrough } from 'stream';
import { NEST_ARCHIVER } from '../nest-ext/nest-archiver/inject-token';
import { NestArchiverDelegate } from '../nest-ext/nest-archiver/nest-archiver.type';
import { NEST_PATH } from '../nest-ext/nest-path/inject-token';
import { NestPath } from '../nest-ext/nest-path/nest-path.type';
import { NEST_FS } from '../nest-ext/nest-fs/inject-token';
import { NestFS } from '../nest-ext/nest-fs/nest-fs.type';
import { NEST_UUID } from '../nest-ext/nest-uuid/inject-token';
import { NestUuid } from '../nest-ext/nest-uuid/nest-uuid.type';


type ZipperFileOptions = {
    filename: string;
}
type ZipperBatchOptions = {
    batchSize: number;
}
@Injectable()
export class ZipperService {

    constructor(
        @Inject(NEST_ARCHIVER) private readonly archiver: NestArchiverDelegate,
        @Inject(NEST_PATH) private readonly path: NestPath,
        @Inject(NEST_FS) private readonly fs: NestFS,
        @Inject(NEST_UUID) private readonly uuid: NestUuid
    ) { }

    public zip(sources: (string | { source: string, name: string })[]): Promise<PassThrough> {
        return new Promise((resolve, reject) => {
            const outputStream = new PassThrough();

            const inputSources = sources.map((source: string | { source: string, name: string }) => ({
                stream: this.fs.createReadStream(typeof source === 'string' ? source : source.source),
                name: typeof source === 'string' ? this.path.basename(source) : source.name,
            }));

            const archive = this.archiver('zip', { zlib: { level: 9 } })

            archive.on('warning', (err) => {
                if (err.code !== 'ENOENT') {
                    reject(err);
                }
            });

            archive.on('error', (err) => reject(err));

            archive.pipe(outputStream);
            for (const source of inputSources) {
                archive.append(source.stream, { name: source.name });
            }

            archive.finalize();
            resolve(outputStream);
        });
    }

    public zipToFile(sources: (string | { source: string, name: string })[], destinationPath: string, options: Partial<ZipperFileOptions & ZipperBatchOptions> | undefined): Promise<string> {

        Logger.log(`Batch size: ${sources.length}`);
        const batchSize = options && options.batchSize ? options.batchSize : 100;
        const zipName = options && options.filename ? options.filename : this.uuid.v4();

        return new Promise((resolve, reject) => {

            if (!this.fs.existsSync(destinationPath)) {
                this.fs.mkdirSync(destinationPath, { recursive: true });
            }

            const outputName = `${destinationPath}/${zipName}.zip`;
            const outputStream = this.fs.createWriteStream(outputName);
            const archive = this.archiver('zip', { zlib: { level: 9 } });

            outputStream.on('close', () => resolve(outputName));
            archive.on('error', (err) => reject(err));
            archive.on('warning', (err) => {
                if (err.code !== 'ENOENT') {
                    reject(err);
                }
            });

            archive.pipe(outputStream);

            const processBatch = (startIndex: number) => {
                const endIndex = Math.min(startIndex + batchSize, sources.length);
                const currentBatch = sources.slice(startIndex, endIndex);
                Logger.log(`Batch process ${startIndex} - ${endIndex}`);

                const promises: Promise<void>[] = [];

                for (const source of currentBatch) {
                    promises.push(new Promise<void>((resolveFile, rejectFile) => {
                        const stream = this.fs.createReadStream(typeof source === 'string' ? source : source.source);
                        const filename = typeof source === 'string' ? this.path.basename(source) : source.name;
                        archive.append(stream, { name: filename });

                        stream.on('end', resolveFile);
                        stream.on('error', rejectFile);
                    }));
                }

                Promise
                    .all(promises)
                    .then(() => {
                        if (endIndex < sources.length) {
                            processBatch(endIndex);
                        } else {
                            archive.finalize();
                        }
                    })
                    .catch(reject);
            }

            processBatch(0);
        });
    }
}
