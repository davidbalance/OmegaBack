import { Module } from '@nestjs/common';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { OrderModule } from './order/order.module';
import { ResultModule } from './result/result.module';

@Module({
    imports: [
        MedicalReportModule,
        OrderModule,
        ResultModule
    ]
})
export class MedicalResultModule { }
