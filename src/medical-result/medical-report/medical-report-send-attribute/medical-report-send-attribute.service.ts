import { Inject, Injectable } from '@nestjs/common';
import { AbstractSendAttributeService } from '@/shared';
import { MedicalReportSendAttribute } from './entities/medical-report-send-attribute.entity';
import { MedicalReportSendAttributeRepository } from './medical-report-send-attribute.repository';

@Injectable()
export class MedicalReportSendAttributeService extends AbstractSendAttributeService<MedicalReportSendAttribute, MedicalReportSendAttributeRepository> {

  constructor(
    @Inject(MedicalReportSendAttributeRepository) private readonly repository: MedicalReportSendAttributeRepository
  ) {
    super(repository);
  }
}