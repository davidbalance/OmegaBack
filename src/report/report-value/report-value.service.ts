import { Inject, Injectable } from '@nestjs/common';
import { ReportValueRepository } from './report-value.repository';
import { ReportValue } from './entities/report-value.entity';
import { CreateReportValueRequestDTO } from 'src/shared';
import { MedicalReport } from '../medical-report/entities/medical-report.entity';

@Injectable()
export class ReportValueService {

  constructor(
    @Inject(ReportValueRepository) private readonly repository: ReportValueRepository
  ) { }

  async create(value: CreateReportValueRequestDTO, report: MedicalReport): Promise<ReportValue> {
    return await this.repository.create({ ...value, report: report });
  }
}
