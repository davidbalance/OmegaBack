import { Module } from '@nestjs/common';
import { MedicalReportSendAttributeService } from './medical-report-send-attribute.service';
import { SqlDatabaseModule } from '@/shared';
import { MedicalReportSendAttribute } from './entities/medical-report-send-attribute.entity';
import { MedicalReportSendAttributeRepository } from './medical-report-send-attribute.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([MedicalReportSendAttribute])],
  providers: [
    MedicalReportSendAttributeService,
    MedicalReportSendAttributeRepository
  ],
  exports: [MedicalReportSendAttributeService],
})
export class MedicalReportSendAttributeModule { }
