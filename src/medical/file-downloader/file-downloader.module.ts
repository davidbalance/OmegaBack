import { Module } from '@nestjs/common';
import { ZipperModule } from '@/shared/zipper/zipper.module';
import { MedicalReportModule } from '../medical-report/medical-report.module';
import { FileDownloaderController } from './controllers/file-downloader.controller';
import { LocalStorageModule } from '@/shared/storage-manager';
import { MedicalResultModule } from '../medical-result/medical-result.module';
import { FileDownloaderService } from './services/file-downloader.service';
import { MedicalOrderModule } from '../medical-order/medical-order.module';
import { FileTreeDownloaderController } from './controllers/file-tree-downloader.controller';
import { FileTreeDownloaderService } from './services/file-tree-downloader.service';

@Module({
    imports: [
        MedicalOrderModule,
        MedicalResultModule,
        MedicalReportModule,
        LocalStorageModule,
        ZipperModule.register({})
    ],
    controllers: [
        FileDownloaderController,
        FileTreeDownloaderController
    ],
    providers: [
        FileDownloaderService,
        FileTreeDownloaderService
    ],
})
export class FileDownloaderModule { }
