import { Inject, Injectable } from '@nestjs/common';
import { CreateMedicalReportValueRequestDTO } from '@/medical-result/common/dtos';
import { MedicalReportValue } from './entities/medical-report-value.entity';
import { MedicalReportValueRepository } from './medical-report-value.repository';

@Injectable()
export class MedicalReportValueService {

  constructor(
    @Inject(MedicalReportValueRepository) private readonly repository: MedicalReportValueRepository
  ) { }

  async create(value: CreateMedicalReportValueRequestDTO): Promise<MedicalReportValue> {
    return await this.repository.create({ ...value });
  }
}
