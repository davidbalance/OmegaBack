import { MedicalReportFileManagementService } from "@/medical/medical-report/services/medical-report-file-management.service";
import { MedicalResultFileManagementService } from "@/medical/medical-result/services/medical-result-file-management.service";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { FileManagementService } from "@/shared/utils/bases/base.file-service";
import { ZipperService } from "@/shared/zipper/zipper.service";
import { Injectable, Inject, StreamableFile, NotFoundException } from "@nestjs/common";
import { FileSourceEnum, FileSourceRequestDto } from "../dto/request/base.file-source.request.dto";
import { PostDownloadZipRequestDto } from "../dto/request/post.download-zip.request.dto";

@Injectable()
export class FileDownloaderService {

    private readonly fileServices: Record<FileSourceEnum, FileManagementService<number>>;

    constructor(
        @Inject(ZipperService) private readonly zipper: ZipperService,
        @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
        @Inject(MedicalResultFileManagementService) private readonly medicalResultService: FileManagementService<number>,
        @Inject(MedicalReportFileManagementService) private readonly medicalReportService: FileManagementService<number>,
    ) {
        this.fileServices = {
            report: medicalReportService,
            result: medicalResultService
        };
    }

    async downloadFile({ id, type }: FileSourceRequestDto): Promise<StreamableFile> {
        const source = await this.fileServices[type].getFilePath(id);
        const stream = this.storage.readFile(source);
        return stream;
    }

    async downloadMultipleFiles({ files }: PostDownloadZipRequestDto): Promise<StreamableFile> {
        const sources: string[] = [];
        for (const file of files) {
            const source = await this.fileServices[file.type].getFilePath(file.id);
            sources.push(source);
        }

        const zip = await this.zipper.zip(sources);
        return zip;
    }

    async deleteFile({ id, type }: FileSourceRequestDto): Promise<void> {
        const state = await this.fileServices[type].removeFile(id);
        if (!state) {
            throw new NotFoundException('Archivo no eliminado');
        }
    }
}
