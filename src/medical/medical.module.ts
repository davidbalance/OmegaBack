import { Module } from '@nestjs/common';
import { FileDownloaderModule } from './file-downloader/file-downloader.module';
import { MedicalClientModule } from './medical-client/medical-client.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { MedicalResultModule } from './medical-result/medical-result.module';
import { MedicalOrderModule } from './medical-order/medical-order.module';
import { MedicalOrderResultModule } from './medical-order-result/medical-order-result.module';
import { ChecklistModule } from './checklist/checklist.module';

@Module({
    imports: [
        MedicalReportModule,
        MedicalOrderModule,
        MedicalResultModule,
        FileDownloaderModule,
        MedicalClientModule,
        MedicalOrderResultModule,
        ChecklistModule
    ]
})
export class MedicalModule { }
