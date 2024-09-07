import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrder } from "../dtos/response/medical-order.base.dto";
import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";
import { MedicalOrderEntity } from "../entities/medical-order.entity";
import { SelectQueryBuilder } from "typeorm";

@Injectable()
export class MedicalOrderDoctorPaginationService extends BasePaginationService<MedicalOrderEntity, MedicalOrder> {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
  ) { super(); }

  protected queryBuilder(filter: string, extras: { doctor: string, patient: string }): SelectQueryBuilder<MedicalOrderEntity> {
    return this.repository.query('order')
      .leftJoin('order.results', 'result', 'result.doctorDni = :doctor', { doctor: extras.doctor })
      .leftJoin('order.client', 'client', 'client.patientDni = :patient', { patient: extras.patient })
      .select('order.id', 'id')
      .addSelect('order.process', 'process')
      .addSelect('order.createAt', 'createAt')
      .addSelect('order.mailStatus', 'mailStatus')
      .addSelect('order.orderStatus', 'orderStatus')
      .where('order.process LIKE  :filter', { filter: `%${filter}%` })
  }
}
