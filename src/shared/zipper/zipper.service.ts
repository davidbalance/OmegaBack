import { Inject, Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import { NEST_ARCHIVER } from '../nest-ext/archiver/inject-token';
import { ArchiverDelegate } from '../nest-ext/archiver/archiver.type';
import { NEST_PATH } from '../nest-ext/path/inject-token';
import { Path } from '../nest-ext/path/path.type';
import { NEST_UUID } from '../nest-ext/uuid/inject-token';
import { Uuid } from '../nest-ext/uuid/uuid.type';
import { FILE_SYSTEM } from '../file-system/inject-token';
import { IFileSystem } from '../file-system/file-system.interface';

@Injectable()
export class ZipperService {

    constructor(
        @Inject(NEST_ARCHIVER) private readonly archiver: ArchiverDelegate,
        @Inject(NEST_PATH) private readonly path: Path,
        @Inject(FILE_SYSTEM) private readonly fileSystem: IFileSystem) { }

    public async zip(sources: (string | { source: string, name: string })[]): Promise<PassThrough> {
        const promises = sources.map(async (source: string | { source: string, name: string }) => ({
            stream: await this.fileSystem.read(typeof source === 'string' ? source : source.source),
            name: typeof source === 'string' ? this.path.basename(source) : source.name,
        }));

        const fileSources = await Promise.all(promises);

        return new Promise((resolve, reject) => {
            const outputStream = new PassThrough();

            const archive = this.archiver('zip', { zlib: { level: 9 } })

            archive.pipe(outputStream);
            archive.on('error', (err) => reject(err));
            archive.on('warning', (err) => {
                if (err.code !== 'ENOENT') {
                    reject(err);
                }
            });

            for (const source of fileSources) {
                archive.append(source.stream, { name: source.name });
            }

            archive.finalize();
            resolve(outputStream);
        });
    }
}
