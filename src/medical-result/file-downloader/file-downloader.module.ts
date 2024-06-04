import { Module } from '@nestjs/common';
import { FileDownloaderService } from './file-downloader.service';
import { ZipperModule } from '@/shared/zipper/zipper.module';
import { ResultModule } from '../result/result.module';
import { MedicalReportModule } from '../medical-report/medical-report.module';
import { FileDownloaderController } from './file-downloader.controller';
import { LocalStorageModule } from '@/shared/storage-manager';

@Module({
    imports: [
        ResultModule,
        MedicalReportModule,
        LocalStorageModule,
        ZipperModule.register({})
    ],
    providers: [FileDownloaderService],
    controllers: [FileDownloaderController]
})
export class FileDownloaderModule { }
