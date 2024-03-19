import { Inject, Injectable } from '@nestjs/common';
import { ReportValueRepository } from './report-value.repository';
import { ReportValue } from './entities/report-value.entity';
import { CreateReportValueRequestDTO } from 'src/shared';

@Injectable()
export class ReportValueService {

  constructor(
    @Inject(ReportValueRepository) private readonly repository: ReportValueRepository
  ) { }

  async create(createReportValueDto: CreateReportValueRequestDTO): Promise<ReportValue> {
    return await this.repository.create(createReportValueDto);
  }
}
