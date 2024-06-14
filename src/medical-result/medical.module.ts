import { Module } from '@nestjs/common';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { FileDownloaderModule } from './file-downloader/file-downloader.module';
import { MedicalResultModule } from './medical-result/medical-result.module';
import { MedicalOrder } from './medical-order/entities/medical-order.entity';

@Module({
    imports: [
        MedicalReportModule,
        MedicalOrder,
        MedicalResultModule,
        FileDownloaderModule
    ]
})
export class MedicalModule { }
