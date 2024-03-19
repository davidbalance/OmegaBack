import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ResultRepository } from './repositories/result.repository';
import { Result } from './entities/result.entity';
import { FindOrCreateDoctorRequestDTO, FindOrCreateExamRequestDTO, FindOrCreateOrderRequestDTO, FindOrCreatePatientRequestDTO } from 'src/shared';
import { StorageSaver } from 'src/shared/storage-saver';
import { OrderService } from '../order/order.service';
import { MorbidityService } from 'src/morbidity/morbidity/morbidity.service';
import { ExamService } from 'src/exam/exam.service';
import { DoctorService } from '@/user/doctor/doctor.service';
import { ResultSendStatusService } from './result-send-status.service';

@Injectable()
export class ResultService {

  constructor(
    @Inject(ResultRepository) private readonly repository: ResultRepository,
    @Inject(ResultSendStatusService) private readonly senderService: ResultSendStatusService,
    @Inject(StorageSaver) private readonly saver: StorageSaver,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
    @Inject(OrderService) private readonly orderService: OrderService,
    @Inject(ExamService) private readonly examService: ExamService,
    @Inject(MorbidityService) private readonly morbidityService: MorbidityService
  ) { }

  async create(
    file: Express.Multer.File,
    findOrCreateExam: FindOrCreateExamRequestDTO,
    findOrCreatePatient: FindOrCreatePatientRequestDTO,
    findOrCreateDoctor: FindOrCreateDoctorRequestDTO,
    findOrCreateOrder: FindOrCreateOrderRequestDTO): Promise<Result> {
    const order = await this.orderService.findOrCreateOrder(findOrCreateOrder, findOrCreatePatient);
    const doctor = await this.doctorService.findOrCreateDoctor(findOrCreateDoctor);
    const exam = await this.examService.findOrCreateExam(findOrCreateExam);
    const directory: string = `medical-order/${findOrCreateOrder.key}/${findOrCreatePatient.dni}`;
    const filename: string = await this.saver.saveFile(file, directory);
    return await this.repository.create({
      doctor: doctor.id,
      order: order,
      exam: exam.id,
      filename: filename,
      path: directory
    });
  }

  async findOneByID(id: number): Promise<Result> {
    return await this.repository.findOne({ id });
  }

  async updateMorbidity(id: number, morbidity: number): Promise<Result> {
    const retrivedMorbidity = await this.morbidityService.findOneByID(morbidity);
    return await this.repository.findOneAndUpdate({ id }, { morbidity: retrivedMorbidity.id });
  }

  async send(id: number, sender: string): Promise<Result> {
    let result = await this.repository.findOne({ id: id, sendsStatus: { name: sender } });
    if (result) throw new ConflictException([`The item already been send to ${sender}`]);
    result = await this.repository.findOne({ id });
    // Here goes send logic for each send item
    const resultSender = await this.senderService.create(sender, result);
    return result;
  }
}
