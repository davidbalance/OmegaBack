import { Inject, Injectable } from "@nestjs/common";
import { ResultExternalKeyService } from "../result-external-key/result-external-key.service";
import { ResultRepository } from "../result.repository";
import { Result } from "../entities/result.entity";
import { OrderExternalConnectionService } from "@/medical-result/order/external-connections/order-external-connection.service";
import { CreateResultExternalRequestDTO } from "@/medical-result/common/dtos/result-external-connection.request.dto";
import { StorageManager } from "@/shared/storage-manager";
import { extname } from "path";
import { ResultEvent, ResultFindOrCreateDoctorEvent, ResultFindOrCreateExamEvent, fileResultPath } from "@/shared";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DoctorService } from "@/user/doctor/doctor.service";

@Injectable()
export class ResultExternalConnectionService {
    constructor(
        @Inject(ResultExternalKeyService) private readonly externalKeyService: ResultExternalKeyService,
        @Inject(OrderExternalConnectionService) private readonly orderService: OrderExternalConnectionService,
        @Inject(DoctorService) private readonly doctorService: DoctorService,
        @Inject(ResultRepository) private readonly repository: ResultRepository,
        @Inject(StorageManager) private readonly storageManager: StorageManager,
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    async create({ source, key, order, doctor, exam }: CreateResultExternalRequestDTO & { source: string }, file: Express.Multer.File): Promise<Result> {

        const foundOrder = await this.orderService.findOneOrCreate({ source, ...order });

        const medicalResultPath = fileResultPath({ dni: order.patient.dni, order: foundOrder.id })
        const extension = extname(file.originalname);
        const fileName = await this.storageManager.saveFile(file.buffer, extension, medicalResultPath);

        let signature = '';
        try {
            const doctorSignature = await this.doctorService.findOneByDni(doctor.dni);
            signature = doctorSignature.signature;
        } catch (error) {

        }

        const newKey = await this.externalKeyService.create({ key, source });
        const newResult = await this.repository.create({
            fileName: fileName,
            order: foundOrder,
            externalKey: newKey,
            doctorDni: doctor.dni,
            doctorFullname: `${doctor.name} ${doctor.lastname}`,
            doctorSignature: signature,
            examName: exam.name,
        });

        this.eventEmitter.emit(ResultEvent.FIND_OR_CREATE_DOCTOR, new ResultFindOrCreateDoctorEvent(doctor));
        this.eventEmitter.emit(ResultEvent.FIND_OR_CREATE_EXAM, new ResultFindOrCreateExamEvent({ source, ...exam }));

        return newResult;
    }

    async findOneOrCreate(): Promise<Result> { return; }

    async findOneAndUpdate(): Promise<Result> { return; }
}