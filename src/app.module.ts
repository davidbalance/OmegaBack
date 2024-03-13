import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlDatabaseModule } from './shared';
import { MedicalOrderModule } from './medical-order/medical-order.module';
import { MorbidityModule } from './morbidity/morbidity.module';
import { ExamModule } from './exam/exam.module';
import { ReportModule } from './report/report.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    SqlDatabaseModule,
    MedicalOrderModule,
    MorbidityModule,
    ExamModule,
    ReportModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
