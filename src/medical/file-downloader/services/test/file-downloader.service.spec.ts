import { MedicalReportFileManagementService } from "@/medical/medical-report/services/medical-report-file-management.service";
import { MedicalResultFileManagementService } from "@/medical/medical-result/services/medical-result-file-management.service";
import { FileManagementService } from "@/shared/utils/bases/base.file-service";
import { ZipperService } from "@/shared/zipper/zipper.service";
import { Injectable, Inject, StreamableFile, NotFoundException, Logger } from "@nestjs/common";
import { FileSourceEnum, FileSourceRequestDto } from "../dtos/request/base.file-source.request.dto";
import { PostDownloadZipRequestDto } from "../dtos/request/post.download-zip.request.dto";

@Injectable()
export class FileDownloaderService {

    private readonly fileServices: Record<FileSourceEnum, FileManagementService<number>>;

    constructor(
        @Inject(ZipperService) private readonly zipper: ZipperService,
        @Inject(MedicalResultFileManagementService) private readonly medicalResultService: FileManagementService<number>,
        @Inject(MedicalReportFileManagementService) private readonly medicalReportService: FileManagementService<number>,
    ) {
        this.fileServices = {
            report: medicalReportService,
            result: medicalResultService
        };
    }

    async downloadFile({ id, type }: FileSourceRequestDto): Promise<StreamableFile> {
        const stream = await this.fileServices[type].getFile(id);
        return stream;
    }

    async downloadMultipleFiles({ files }: PostDownloadZipRequestDto): Promise<StreamableFile> {
        const sources: string[] = [];
        for (const file of files) {
            try {
                const source = await this.fileServices[file.type].getFilePath(file.id);
                sources.push(source);
            } catch (error) {
                Logger.error(error);
            }
        }
        if (!sources.length) {
            throw new NotFoundException('Files not found');
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
