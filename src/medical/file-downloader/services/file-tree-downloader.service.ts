import { MedicalResultFileTreeService } from "@/medical/medical-result/services/medical-result-file-tree.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { DownloadTreeRequest } from "../dtos/request/download-tree.dto";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bull";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { ZipTreeRepository } from "../repositories/zip-tree.repository";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";

@Injectable()
export class FileTreeDownloaderService {

    constructor(
        @InjectQueue('zip-tree') private readonly zipQueue: Queue,
        @Inject(MedicalResultFileTreeService) private readonly treeService: MedicalResultFileTreeService,
        @Inject(ZipTreeRepository) private readonly repository: ZipTreeRepository,
        @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
    ) { }

    async startTreeJob(email: string, data: DownloadTreeRequest): Promise<string> {
        const sources = await this.treeService.getTreeSources(data);
        const job = await this.zipQueue.add('zip-tree', { sources, email });
        return job.id.toString();
    }

    async downloadTree(email: string, code: string): Promise<ReadStream> {
        const value = await this.repository.findOne({ where: { zipCode: code } });
        
        if (value.email !== email) {
            throw new UnauthorizedException();
        }
        
        const zip = await this.storage.readFile(value.filepath);
        return zip;
    }
}
