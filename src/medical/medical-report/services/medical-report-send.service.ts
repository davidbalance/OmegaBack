import { Inject, Injectable } from '@nestjs/common';
import { MedicalReportSendAttributeRepository } from '../repositories/medical-report-send-attribute.repository';
import { MedicalReportManagementService } from './medical-report-management.service';
import { MedicalReport } from '../entities/medical-report.entity';

@Injectable()
export class MedicalReportSendService {

  constructor(
    @Inject(MedicalReportSendAttributeRepository) private readonly sendRepository: MedicalReportSendAttributeRepository,
    @Inject(MedicalReportManagementService) private readonly medicalReportService: MedicalReportManagementService
  ) { }

  async send(id: number, value: string): Promise<MedicalReport> {
    const attribute = await this.sendRepository.create({ value });
    const { sendAttributes } = await this.medicalReportService.findOne(id);
    sendAttributes.concat(attribute);
    const report = await this.medicalReportService.updateOne(id, { sendAttributes: sendAttributes });
    return report;
  }
}