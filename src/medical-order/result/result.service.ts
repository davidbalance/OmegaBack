import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ResultRepository } from './repositories/result.repository';
import { Result } from './entities/result.entity';
import { CreateResultRequestDTO } from 'src/shared';
import { StorageSaver } from 'src/shared/storage-saver';
import { OrderService } from '../order/order.service';
import { MorbidityService } from 'src/morbidity/morbidity/morbidity.service';
import { ExamService } from 'src/exam/exam.service';
import { DoctorService } from '@/user/doctor/doctor.service';
import { ResultSendStatusService } from './result-send-status.service';

interface FindResultParams {
  exam?: number;
  morbidity?: number;
  doctor?: number;
}

@Injectable()
export class ResultService {

  constructor(
    @Inject(ResultRepository) private readonly repository: ResultRepository,
    @Inject(ResultSendStatusService) private readonly senderService: ResultSendStatusService,
    @Inject(OrderService) private readonly orderService: OrderService,
    @Inject(StorageSaver) private readonly storage: StorageSaver,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
    @Inject(ExamService) private readonly examService: ExamService,
    @Inject(MorbidityService) private readonly morbidityService: MorbidityService
  ) { }

  async create(file: Express.Multer.File, createResult: CreateResultRequestDTO): Promise<Result> {
    const order = await this.orderService.findOne({ id: createResult.order });
    const directory: string = `medical-order/${order.patient}/${order.id}`;
    const filename: string = await this.storage.saveFile(file, directory);
    const result = await this.repository.create({
      ...createResult,
      path: directory,
      filename: filename,
      order: order
    });
    return result;
  }

  async find(params?: FindResultParams): Promise<Result[]> {
    return await this.repository.find(params);
  }

  async findOne(params?: FindResultParams & { id: number }): Promise<Result> {
    return await this.repository.findOne(params);
  }

  async updateMorbidity(id: number, morbidity: number): Promise<Result> {
    return await this.repository.findOneAndUpdate({ id }, { morbidity: morbidity });
  }

  async send(id: number, sender: string): Promise<Result> {
    let result = await this.repository.findOne({ id: id, sendsStatus: { name: sender } });
    if (result) throw new ConflictException([`The item already been send to ${sender}`]);
    result = await this.repository.findOne({ id });
    await this.senderService.create(sender, result);
    return result;
  }
}
