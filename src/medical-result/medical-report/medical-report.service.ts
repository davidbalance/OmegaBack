import { Inject, Injectable } from '@nestjs/common';
import { MedicalReportRepository } from './medical-report.repository';
import { CreateMedicalReportRequestDTO } from '../common/dtos';
import { MedicalReport } from './entities/medical-report.entity';
import { MedicalReportValueService } from './medical-value/medical-report-value.service';

@Injectable()
export class MedicalReportService {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(MedicalReportValueService) private readonly valueService: MedicalReportValueService
  ) { }

  async create({ values, ...data }: CreateMedicalReportRequestDTO): Promise<MedicalReport> {
    const reportValues = await Promise.all(values.map((val) => this.valueService.create(val)));
    const report = await this.repository.create({ ...data, values: reportValues });
    return report;
  }
}
