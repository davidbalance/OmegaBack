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
import { FileZipTreeConsumer } from './consumer/file-zip-tree.consumer';
import { BullModule } from '@nestjs/bullmq';
import { UserInterceptorModule } from '@/shared/interceptors/dni/user-interceptor.module';

@Module({
    imports: [
        SqlDatabaseModule.forFeature([ZipTree]),
        MedicalOrderModule,
        MedicalResultModule,
        MedicalReportModule,
        LocalStorageModule,
        ZipperModule,
        NestUuidModule,
        UserInterceptorModule,
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
        FileZipTreeConsumer,
        FileDownloaderService,
        FileTreeDownloaderService
    ],
})
export class FileDownloaderModule { }
