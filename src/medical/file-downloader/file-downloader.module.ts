import { Module } from '@nestjs/common';
import { ZipperModule } from '@/shared/zipper/zipper.module';
import { MedicalReportModule } from '../medical-report/medical-report.module';
import { FileDownloaderController } from './controllers/file-downloader.controller';
import { LocalStorageModule } from '@/shared/storage-manager';
import { MedicalResultModule } from '../medical-result/medical-result.module';
import { FileDownloaderService } from './services/file-downloader.service';

@Module({
    imports: [
        MedicalResultModule,
        MedicalReportModule,
        LocalStorageModule,
        ZipperModule.register({})
    ],
    controllers: [
        FileDownloaderController
    ],
    providers: [
        FileDownloaderService
    ],
})
export class FileDownloaderModule { }
