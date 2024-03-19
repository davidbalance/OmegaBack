import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { Result } from '../result/entities/result.entity';
import { Send } from '../send/entities/send.entity';
import { CreateOrderRequestDTO, FindOrCreateOrderRequestDTO, FindOrCreatePatientRequestDTO } from 'src/shared';
import { PatientService } from 'src/patient/patient.service';
import { BranchService } from 'src/location/branch/branch.service';

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository,
    @Inject(PatientService) private readonly patientService: PatientService,
    @Inject(BranchService) private readonly branchService: BranchService
  ) { }

  async findOrCreateOrder(
    order: FindOrCreateOrderRequestDTO,
    findOrCreatePatient: FindOrCreatePatientRequestDTO,
  ): Promise<Order> {
    const patient = await this.patientService.findOrCreatePatient(findOrCreatePatient);
    try {
      let retrivedOrder = null;
      return retrivedOrder;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return await this.repository.create({ ...order, patient: patient });
      } else {
        Logger.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  async create(order: CreateOrderRequestDTO): Promise<Order> {
    const patient = await this.patientService.readOneByID(order.patient);
    const branch = await this.branchService.readOneByID(order.branch);
    return await this.repository.create({ branch, patient });
  }

  async findOneByID(id: number): Promise<Order> {
    return await this.repository.findOne({ id });
  }

  async readOrdersByDNI(dni: string): Promise<Order[]> {
    return await this.repository.find({ patient: { user: { dni } } });
  }

  async appendResult(id: number, results: Result[]): Promise<Order> {
    return this.repository.findOneAndAppendResult({ id }, results);
  }

  async removeResult(id: number, results: number[]): Promise<Order> {
    return this.repository.findOneAndRemoveResult({ id }, results);
  }

  async send(id: number, sends: Send[]): Promise<Order> {
    const order = await this.repository.findOne({ id }, { sends: true });
    const filterSends = order.sends.filter(e => !sends.includes(e));
    // Here goes send logic for each send item
    return this.repository.findOneAndSend({ id }, filterSends);
  }
}
