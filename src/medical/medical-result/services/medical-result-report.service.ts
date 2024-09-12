import { Inject, Injectable } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultReport } from "../dtos/response/medical-report.base.dto";

@Injectable()
export class MedicalResultReportService {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository
  ) { }

  async findOne(id: number): Promise<MedicalResultReport | undefined> {
    const medicalResult = await this.repository.findOne({
      where: { id: id },
      relations: { report: true }
    });
    return medicalResult.report;
  }
}
