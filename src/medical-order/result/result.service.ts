import { Inject, Injectable } from '@nestjs/common';
import { ResultRepository } from './result.repository';
import { Result } from './entities/result.entity';
import { Send } from '../send/entities/send.entity';
import { FindOrCreateDoctorRequestDTO, FindOrCreateExamRequestDTO, FindOrCreateOrderRequestDTO, FindOrCreatePatientRequestDTO } from 'src/shared';
import { StorageSaver } from 'src/shared/storage-saver';
import { OrderService } from '../order/order.service';
import { MorbidityService } from 'src/morbidity/morbidity/morbidity.service';
import { ExamService } from 'src/exam/exam.service';
import { DoctorService } from '@/user/doctor/doctor.service';

@Injectable()
export class ResultService {

  constructor(
    @Inject(ResultRepository) private readonly repository: ResultRepository,
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
      doctor: doctor,
      order: order,
      exam: exam,
      filename: filename,
      path: directory
    });
  }

  async findOneByID(id: number): Promise<Result> {
    return await this.repository.findOne({ id });
  }

  async updateMorbidity(id: number, morbidity: number): Promise<Result> {
    const retrivedMorbidity = await this.morbidityService.readOneByID(morbidity);
    return await this.repository.findOneAndUpdate({ id }, { morbidity: retrivedMorbidity });
  }

  async send(id: number, sends: Send[]): Promise<Result> {
    const send = await this.repository.findOne({ id }, { sends: true });
    const filterSends = send.sends.filter(e => !sends.includes(e));
    // Here goes send logic for each send item
    return this.repository.findOneAndSend({ id }, filterSends);
  }
}
