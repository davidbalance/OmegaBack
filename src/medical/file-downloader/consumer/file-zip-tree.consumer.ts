import { ServerConfig, ServerConfigName } from "@/shared/config/server.config";
import { MailerService } from "@/shared/mailer/mailer.service";
import { NEST_PATH } from "@/shared/nest-ext/nest-path/inject-token";
import { NestPath } from "@/shared/nest-ext/nest-path/nest-path.type";
import { NEST_UUID } from "@/shared/nest-ext/nest-uuid/inject-token";
import { NestUuid } from "@/shared/nest-ext/nest-uuid/nest-uuid.type";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { ZipperService } from "@/shared/zipper/zipper.service";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassThrough } from "stream";
import { ZipTreeRepository } from "../repositories/zip-tree.repository";
import { Job } from "bullmq";

@Processor('zip-tree')
export class FileZipTreeConsumer extends WorkerHost {

    constructor(
        @Inject(ZipperService) private readonly zipper: ZipperService,
        @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
        @Inject(NEST_UUID) private readonly uuid: NestUuid,
        @Inject(NEST_PATH) private readonly path: NestPath,
        @Inject(ConfigService) private readonly config: ConfigService,
        @Inject(MailerService) private readonly mailer: MailerService,
        @Inject(ZipTreeRepository) private readonly repository: ZipTreeRepository
    ) {
        super();
    }

    async process(job: Job): Promise<any> {
        Logger.log("Consumer started");
        const server = this.config.get<ServerConfig>(ServerConfigName);
        const email: string = job.data.email;
        const sources: { source: string, name: string }[] = job.data.sources;

        Logger.log(`Source length: ${sources.length}`);
        try {
            const code = this.uuid.v4();
            Logger.log("Unique key generated");
            Logger.log("Preparing for zipping");
            const filenames = await this.zipFiles(sources);
            Logger.log("Zipped files");
            Logger.log("Creating record");
            for (const filename of filenames) {
                await this.repository.create({ email, zipCode: code, filepath: filename });
            }

            Logger.log("Sending mail");
            await this.mailer.send({
                subject: 'Arbol de archivos',
                content: `Hola!\n\nPara descargar el archivo debe entrar al siguiente link:\n\n${server.app_client}/omega/tree/${code}`,
                recipients: [{
                    address: email,
                    name: email
                }]
            });
        } catch (error) {
            Logger.error(error);
        }
    }

    async zipFiles(sources: { source: string, name: string }[]): Promise<string[]> {
        try {
            Logger.log("--Enabling zipper");
            Logger.log("--Finding disk location");
            const disk = this.path.resolve('disk');
            const fullpath = this.path.join(disk, 'zip/tree');
            Logger.log("--Zipping file");
            const zip = await this.zipper.zipToFile(sources, fullpath);
            Logger.log("--Zip completed");
            return zip.map(e => e.filename);
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}