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
      .innerJoin('result.orders', 'order', 'order.id = :order', { order: extras.order })
      .leftJoin('result.diseases', 'disease')
      .select('result.id', 'id')
      .addSelect('result.examType', 'examType')
      .addSelect('result.examSubtype', 'examSubtype')
      .addSelect('result.examName', 'examName')
      .addSelect('result.hasFile', 'hasFile')
      .addSelect(`ARRAY_AGG(CONCAT(order.diseaseName, ', ', order.diseaseCommentary ))`, 'diseases')
      .where('result.doctorDni LIKE :doctor', { doctor: extras.doctor })
      .andWhere('result.examName LIKE :examName', { examName: `%${filter}%` })
  }
}
