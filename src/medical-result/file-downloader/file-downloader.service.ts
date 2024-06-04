import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { FindFilePathService } from '@/shared';
import { MedicalReportService } from '@/medical-result/medical-report/medical-report.service';
import { ResultService } from '../result/result.service';
import { ZipperService } from '@/shared/zipper/zipper.service';
import { FileSourceEnum, DownloadAndZipContentRequestDTO, FileSourceRequestDTO } from './dto/file-downloader.request.dto';
import { StorageManager } from '@/shared/storage-manager';

@Injectable()
export class FileDownloaderService {

    private readonly filePathFinders: Record<FileSourceEnum, FindFilePathService<number>>;

    constructor(
        @Inject(ZipperService) private readonly zipper: ZipperService,
        @Inject(StorageManager) private readonly storage: StorageManager,
        @Inject(ResultService) private readonly medicalResultService: FindFilePathService<number>,
        @Inject(MedicalReportService) private readonly medicalReportService: FindFilePathService<number>,
    ) {
        this.filePathFinders = {
            report: medicalReportService,
            result: medicalResultService
        }
    }

    async downloadFile({ id, type }: FileSourceRequestDTO): Promise<StreamableFile> {
        const source = await this.filePathFinders[type].getpath(id);
        const stream = this.storage.readFile(source);
        return stream;
    }

    async downloadMultipleFiles({ files }: DownloadAndZipContentRequestDTO): Promise<StreamableFile> {
        const sources: string[] = [];
        for (const file of files) {
            const source = await this.filePathFinders[file.type].getpath(file.id);
            sources.push(source);
        }

        const zip = this.zipper.zip(sources);
        return zip;
    }
}
