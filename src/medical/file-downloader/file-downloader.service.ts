import { Inject, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { FindFilePathService, RemoveFileService } from '@/shared';
import { ZipperService } from '@/shared/zipper/zipper.service';
import { FileSourceEnum, DownloadAndZipContentRequestDto, FileSourceRequestDto } from './dto/file-downloader.request.dto';
import { StorageManager } from '@/shared/storage-manager';
import { MedicalResultService } from '../medical-result/services/medical-result.service';
import { MedicalReportService } from '../medical-report/medical-report.service';

@Injectable()
export class FileDownloaderService {

    private readonly filePathFinders: Record<FileSourceEnum, FindFilePathService<number>>;
    private readonly fileRemovers: Record<FileSourceEnum, RemoveFileService<number>>;

    constructor(
        @Inject(ZipperService) private readonly zipper: ZipperService,
        @Inject(StorageManager) private readonly storage: StorageManager,
        @Inject(MedicalResultService) private readonly pathResultService: FindFilePathService<number>,
        @Inject(MedicalReportService) private readonly pathReportService: FindFilePathService<number>,
        @Inject(MedicalResultService) private readonly deleteResultService: RemoveFileService<number>,
        @Inject(MedicalReportService) private readonly deleteReportService: RemoveFileService<number>,
    ) {
        this.filePathFinders = {
            report: pathReportService,
            result: pathResultService
        };
        this.fileRemovers = {
            report: deleteReportService,
            result: deleteResultService
        };
    }

    async downloadFile({ id, type }: FileSourceRequestDto): Promise<StreamableFile> {
        const source = await this.filePathFinders[type].getpath(id);
        const stream = this.storage.readFile(source);
        return stream;
    }

    async downloadMultipleFiles({ files }: DownloadAndZipContentRequestDto): Promise<StreamableFile> {
        const sources: string[] = [];
        for (const file of files) {
            const source = await this.filePathFinders[file.type].getpath(file.id);
            sources.push(source);
        }

        const zip = await this.zipper.zip(sources);
        return zip;
    }

    async deleteFile({ id, type }: FileSourceRequestDto): Promise<void> {
        const state = await this.fileRemovers[type].removeFile(id);
        if(!state) {
            throw new NotFoundException('Archivo no eliminado');
        }
    }
}
