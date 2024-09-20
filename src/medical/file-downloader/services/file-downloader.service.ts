import { MedicalReportFileManagementService } from "@/medical/medical-report/services/medical-report-file-management.service";
import { MedicalResultFileManagementService } from "@/medical/medical-result/services/medical-result-file-management.service";
import { FileManagementService } from "@/shared/utils/bases/base.file-service";
import { ZipperService } from "@/shared/zipper/zipper.service";
import { Injectable, Inject, StreamableFile, NotFoundException, Logger } from "@nestjs/common";
import { FileSourceEnum, FileSourceRequestDto } from "../dtos/request/file-source.base.dto";
import { PostDownloadZipRequestDto } from "../dtos/request/download-zip.post.dto";
import { ReadStream } from "fs";
import { MedicalOrderFileManagementService } from "@/medical/medical-order/services/medical-order-file-management.service";

@Injectable()
export class FileDownloaderService {

    private readonly fileServices: Record<FileSourceEnum, FileManagementService<number>>;

    constructor(
        @Inject(ZipperService) private readonly zipper: ZipperService,
        @Inject(MedicalResultFileManagementService) medicalResultService: FileManagementService<number>,
        @Inject(MedicalReportFileManagementService) medicalReportService: FileManagementService<number>,
        @Inject(MedicalOrderFileManagementService) medicalOrderService: FileManagementService<number>,
    ) {
        this.fileServices = {
            report: medicalReportService,
            result: medicalResultService,
            order: medicalOrderService
        };
    }

    async downloadFile({ id, type }: FileSourceRequestDto): Promise<ReadStream> {
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
