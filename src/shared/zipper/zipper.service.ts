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
type ZipperPayload = {
    filename: string,
    errors: number,
    files: number
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

    public zipToFile(sources: (string | { source: string, name: string })[], destinationPath: string, options: Partial<ZipperFileOptions> | undefined = undefined): Promise<ZipperPayload> {

        Logger.log(`File amount: ${sources.length}`);
        const zipName = options && options.filename ? options.filename : this.uuid.v4();

        return new Promise((resolve, reject) => {

            if (!this.fs.existsSync(destinationPath)) {
                this.fs.mkdirSync(destinationPath, { recursive: true });
            }

            let errors: number = 0;
            let success: number = 0;
            const outputName = `${destinationPath}/${zipName}.zip`;
            const outputStream = this.fs.createWriteStream(outputName);
            const archive = this.archiver('zip', { zlib: { level: 9 } });

            outputStream.on('close', () => {
                Logger.log(`Zip ${outputName} completed`);
                resolve({
                    filename: outputName,
                    errors: errors,
                    files: success
                })
            });
            archive.on('error', (err) => reject(err));
            archive.on('warning', (err) => {
                if (err.code !== 'ENOENT') {
                    reject(err);
                }
            });

            archive.pipe(outputStream);

            const processFile = (index: number) => {
                if (index >= sources.length) {
                    archive.finalize();
                    return;
                }
                Logger.log(`File stream ${index}: initialize`);
                Logger.log(`File stream ${index}: set up`);
                const source = sources[index];
                const stream = this.fs.createReadStream(typeof source === 'string' ? source : source.source);
                const filename = typeof source === 'string' ? this.path.basename(source) : source.name;
                
                Logger.log(`File stream ${index}: appending`);
                archive.append(stream, { name: filename });
                
                stream.on('end', () => {
                    success++;
                    Logger.log(`File stream ${index}: completes`);
                    processFile(index + 1);
                });
                stream.on('error', (err) => {
                    Logger.error(`Error processing file ${filename}: ${err.message}`);
                    errors++;
                    processFile(index + 1);
                });
            }

            processFile(0);
        });
    }
}
