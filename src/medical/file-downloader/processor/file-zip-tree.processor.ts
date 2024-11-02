import { ServerConfig, ServerConfigName } from "@/shared/config/server.config";
import { MailerService } from "@/shared/mailer/mailer.service";
import { NEST_PATH } from "@/shared/nest-ext/nest-path/inject-token";
import { NestPath } from "@/shared/nest-ext/nest-path/nest-path.type";
import { NEST_UUID } from "@/shared/nest-ext/nest-uuid/inject-token";
import { NestUuid } from "@/shared/nest-ext/nest-uuid/nest-uuid.type";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { ZipperService } from "@/shared/zipper/zipper.service";
import { Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Job } from "bull";
import { PassThrough } from "stream";
import { ZipTreeRepository } from "../repositories/zip-tree.repository";

@Processor('zip-tree')
export class FileZipTreeProcessor {
    constructor(
        @Inject(ZipperService) private readonly zipper: ZipperService,
        @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
        @Inject(NEST_UUID) private readonly uuid: NestUuid,
        @Inject(NEST_PATH) private readonly path: NestPath,
        @Inject(ConfigService) private readonly config: ConfigService,
        @Inject(MailerService) private readonly mailer: MailerService,
        @Inject(ZipTreeRepository) private readonly repository: ZipTreeRepository
    ) { }

    @Process()
    async zipFiles(job: Job) {
        const server = this.config.get<ServerConfig>(ServerConfigName);
        const email: string = job.data.email;
        const sources: { source: string, name: string }[] = job.data.sources;

        try {
            const zip = this.zipper.zip(sources);
            const buffer = await this.streamToBuffer(zip);
            const code = this.uuid.v4();
            const disk = this.path.resolve('disk');
            const fullpath = this.path.join(disk, 'zip/tree')
            const filename = await this.storage.saveFile(buffer, '.zip', fullpath);

            await this.repository.create({ email, zipCode: code, filepath: filename });

            const mailer = await this.mailer.send({
                subject: 'Arbol de archivos',
                content: `Hola!\nPara descargar el archivo debe entrar al siguiente link:\n${server.app_client}/omega/tree/${code}`,
                recipients: [{
                    address: email,
                    name: email
                }]
            })
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async streamToBuffer(stream: PassThrough): Promise<Buffer> {
        const chunks: Buffer[] = [];

        return new Promise<Buffer>((resolve, reject) => {
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', (err) => reject(err));
        });
    }

}