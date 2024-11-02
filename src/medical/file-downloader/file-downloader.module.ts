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
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { ZipTree } from './entities/zip-tree.entity';
import { NestUuidModule } from '@/shared/nest-ext/nest-uuid/nest-uuid.module';
import { ZipTreeRepository } from './repositories/zip-tree.repository';
import { FileZipTreeProcessor } from './processor/file-zip-tree.processor';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        SqlDatabaseModule.forFeature([ZipTree]),
        MedicalOrderModule,
        MedicalResultModule,
        MedicalReportModule,
        LocalStorageModule,
        ZipperModule,
        NestUuidModule,
        BullModule.registerQueue({
            name: 'zip-tree',
        }),
    ],
    controllers: [
        FileDownloaderController,
        FileTreeDownloaderController
    ],
    providers: [
        ZipTreeRepository,
        FileZipTreeProcessor,
        FileDownloaderService,
        FileTreeDownloaderService
    ],
})
export class FileDownloaderModule { }
