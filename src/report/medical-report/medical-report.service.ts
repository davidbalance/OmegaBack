import { Inject, Injectable } from '@nestjs/common';
import { MedicalReportRepository } from './medical-report.repository';
import { MedicalReport } from './entities/medical-report.entity';
import { ResultService } from 'src/medical-order/result/result.service';
import { CreateReportRequestDTO } from 'src/shared/dtos/report.request.dto';
import { ReportValueService } from '../report-value/report-value.service';
import { DoctorService } from '@/user/doctor/doctor.service';

@Injectable()
export class MedicalReportService {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(ResultService) private readonly resultService: ResultService,
    @Inject(ReportValueService) private readonly valueService: ReportValueService,
    @Inject(DoctorService) private readonly doctorService: DoctorService
  ) { }

  async create(medicalReport: CreateReportRequestDTO): Promise<MedicalReport> {
    const doctor = await this.doctorService.findOneByID(medicalReport.doctor);
    const report = await this.repository.create({
      result: medicalReport.result,
      doctorDNI: doctor.user.dni,
      doctorFullname: `${doctor.user.name} ${doctor.user.lastname}`,
      doctorSignature: doctor.signature,
    });
    Promise.all(medicalReport.values.map(async (value) => await this.valueService.create(value, report)));
    return report;
  }
}
