import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";
import { MedicalOrderEntity } from "../entities/medical-order.entity";
import { SelectQueryBuilder } from "typeorm";
import { MedicalOrderDoctor } from "../dtos/response/medical-order-doctor.base.dto";

@Injectable()
export class MedicalOrderDoctorPaginationService extends BasePaginationService<MedicalOrderEntity, MedicalOrderDoctor> {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
  ) { super(); }

  protected queryBuilder(filter: string, extras: { doctor: string, patient: string }): SelectQueryBuilder<MedicalOrderEntity> {
    return this.repository.query('order')
      .innerJoin('order.results', 'result', 'result.doctorDni = :doctor', { doctor: extras.doctor })
      .innerJoin('order.client', 'client', 'client.dni = :patient', { patient: extras.patient })
      .leftJoinAndSelect('result.report', 'report')
      .select('order.id', 'id')
      .addSelect('order.process', 'process')
      .addSelect('order.createAt', 'createAt')
      .addSelect('order.mailStatus', 'mailStatus')
      .addSelect('order.orderStatus', 'orderStatus')
      .addSelect('report.id', 'report')
      .where('order.process LIKE :filter', { filter: `%${filter}%` })
  }

  protected transform(data: { id: string, process: string, createAt: Date, mailStatus: boolean, orderStatus: string, report: number | undefined }[]): MedicalOrderDoctor[] {
    const transformed: Record<number, MedicalOrderDoctor> = data.reduce((prev, curr) => ({
      ...prev,
      [curr.id]: {
        ...curr,
        leftReports: (prev[curr.id] ? prev[curr.id].leftReports : 0) + (curr.report ? 0 : 1)
      }
    }), {});
    return Object.values(transformed);
  }
}
