import { Inject, Injectable } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";
import { MedicalResultEntity } from "../entities/medical-result.entity";
import { MedicalResult } from "../dtos/response/medical-result.base.dto";
import { SelectQueryBuilder } from "typeorm";

@Injectable()
export class MedicalResultDoctorPaginationService extends BasePaginationService<MedicalResultEntity, MedicalResult> {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras: { doctor: string, order: number }): SelectQueryBuilder<MedicalResultEntity> {
    return this.repository.query('result')
      .innerJoin('result.order', 'order', 'order.id = :order', { order: extras.order })
      .leftJoin('result.report', 'report')
      .leftJoin('result.diseases', 'disease')
      .select('result.id', 'id')
      .addSelect('result.examType', 'examType')
      .addSelect('result.examSubtype', 'examSubtype')
      .addSelect('result.examName', 'examName')
      .addSelect('result.hasFile', 'hasFile')
      .addSelect('disease.diseaseName', 'diseaseName')
      .addSelect('disease.diseaseCommentary', 'diseaseCommentary')
      .addSelect('report.id', 'reportId')
      .addSelect('report.hasFile', 'reportHasFile')
      .where('result.doctorDni LIKE :doctor', { doctor: extras.doctor })
      .andWhere('result.examName LIKE :examName', { examName: `%${filter}%` })
  }

  protected transform(data: { id: number, examType: string, examSubtype: string, examName: string, hasFile: boolean, diseaseName: string, diseaseCommentary: string, reportId: number, reportHasFile: boolean, orderHasFile: boolean }[]): MedicalResult[] {
    const transformed: Record<number, MedicalResult> = data.reduce((prev, curr) => ({
      ...prev, [curr.id]: {
        ...curr,
        ...prev[curr.id],
        diseases: [...(prev[curr.id] ? prev[curr.id].diseases : []), curr.diseaseName && curr.diseaseCommentary ? `${curr.diseaseName}, ${curr.diseaseCommentary}` : null].filter(e => !!e)
      } as MedicalResult
    }), {});
    return Object.values(transformed);
  }
}
