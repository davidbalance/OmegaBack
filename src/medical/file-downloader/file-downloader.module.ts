import { Module } from '@nestjs/common';
import { ZipperModule } from '@/shared/zipper/zipper.module';
import { MedicalReportModule } from '../medical-report/medical-report.module';
import { FileDownloaderController } from './controllers/file-downloader.controller';
import { MedicalResultModule } from '../medical-result/medical-result.module';
import { FileDownloaderService } from './services/file-downloader.service';
import { MedicalOrderModule } from '../medical-order/medical-order.module';
import { UuidModule } from '@/shared/nest-ext/uuid/uuid.module';
import { UserInterceptorModule } from '@/shared/interceptors/dni/user-interceptor.module';

@Module({
    imports: [
        MedicalOrderModule,
        MedicalResultModule,
        MedicalReportModule,
        ZipperModule,
        UuidModule,
        UserInterceptorModule
    ],
    controllers: [
        FileDownloaderController,
    ],
    providers: [
        FileDownloaderService,
    ],
})
export class FileDownloaderModule { }
