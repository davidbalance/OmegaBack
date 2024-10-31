import { MedicalResultFileTreeService } from "@/medical/medical-result/services/medical-result-file-tree.service";
import { Inject, Injectable, StreamableFile } from "@nestjs/common";
import { DownloadTreeRequest } from "../dtos/request/download-tree.dto";

@Injectable()
export class FileTreeDownloaderService {

    constructor(
        @Inject(MedicalResultFileTreeService) private readonly service: MedicalResultFileTreeService,
    ) { }

    async downloadTree(data: DownloadTreeRequest): Promise<StreamableFile> {
        return this.service.getTree(data);
    }
}
