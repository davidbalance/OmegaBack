import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { SqlDatabaseModule } from 'src/shared';
import { DoctorModule } from '@/user/doctor/doctor.module';
import { OrderModule } from '../order/order.module';
import { DiseaseModule } from '@/disease/disease/disease.module';
import { Result } from './entities/result.entity';
import { ResultRepository } from './result.repository';
import { PatientModule } from '@/user/patient/patient.module';
import { MedicalReportModule } from '../medical-report/medical-report.module';
import { CompanyModule } from '@/location/company/company.module';
import { ExternalKeyModule } from './external-key/external-key.module';
import { SendValueModule } from './send-value/send-value.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Result]),
    DoctorModule,
    PatientModule,
    CompanyModule,
    MedicalReportModule,
    OrderModule,
    DiseaseModule,
    ExternalKeyModule,
    SendValueModule
  ],
  controllers: [ResultController],
  providers: [
    ResultService,
    ResultRepository
  ],
  exports: [ResultService]
})
export class ResultModule { }
