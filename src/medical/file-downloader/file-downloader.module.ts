import { Module } from '@nestjs/common';
import { FileDownloaderService } from './file-downloader.service';
import { ZipperModule } from '@/shared/zipper/zipper.module';
import { MedicalReportModule } from '../medical-report/medical-report.module';
import { FileDownloaderController } from './file-downloader.controller';
import { LocalStorageModule } from '@/shared/storage-manager';
import { MedicalResultModule } from '../medical-result/medical-result.module';

@Module({
    imports: [
        MedicalResultModule,
        MedicalReportModule,
        LocalStorageModule,
        ZipperModule.register({})
    ],
    providers: [FileDownloaderService],
    controllers: [FileDownloaderController]
})
export class FileDownloaderModule { }
