import { Inject, Injectable, Logger, Provider } from '@nestjs/common';
import { ZipPayload, ZipProvider } from '@shared/shared/providers/zip.provider';
import { ZipToken, ZipType } from './local-zip.dependency';
import { InternalError } from '@shared/shared/domain/error';
import { ZipperProviderToken } from '@shared/shared/nest/inject';

@Injectable()
export class LocalZipService implements ZipProvider {

    constructor(
        @Inject(ZipToken) private readonly zipper: ZipType
    ) { }

    async zip(values: ZipPayload[]): Promise<Buffer> {
        const zip = this.zipper('zip', { zlib: { level: 9 } });

        for (const value of values) {
            zip.append(value.buffer, { name: value.filename });
        }

        await zip.finalize();
        return new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            zip.on('data', (chunk: Buffer) => chunks.push(chunk));
            zip.on('end', () => resolve(Buffer.concat(chunks)));
            zip.on('error', (err) => {
                Logger.error(err);
                reject(new InternalError('Error doing the zip.'));
            });
        })

    }
}

export const ZipperProvider: Provider = {
    provide: ZipperProviderToken,
    useClass: LocalZipService
}