import { Inject, Injectable } from "@nestjs/common";
import { ExternalKeyService } from "../external-key/external-key.service";
import { ExternalConnectionService as MedicalOrderExternalConnectionService } from "@/medical-result/medical-order/services/external-connection.service";
import { StorageManager } from "@/shared/storage-manager";
import { extname } from "path";
import { ResultEvent, ResultFindOrCreateDoctorEvent, ResultFindOrCreateExamEvent, fileResultPath, signaturePath } from "@/shared";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { POSTMedicalResultRequestDTO } from "@/medical-result/common/dtos/result-external-connection.request.dto";
import { MedicalResult } from "../entities/result.entity";
import { MedicalResultRepository } from "../medical-result.repository";

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(ExternalKeyService) private readonly externalKeyService: ExternalKeyService,
        @Inject(MedicalOrderExternalConnectionService) private readonly orderService: MedicalOrderExternalConnectionService,
        @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
        @Inject(StorageManager) private readonly storageManager: StorageManager,
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    async create({ source, key, order, doctor, exam }: POSTMedicalResultRequestDTO & { source: string }, file: Express.Multer.File): Promise<MedicalResult> {

        const foundOrder = await this.orderService.findOneOrCreate({ source, ...order });

        const medicalResultPath = fileResultPath({ dni: order.patient.dni, order: foundOrder.id })
        const extension = extname(file.originalname);
        const filePath = await this.storageManager.saveFile(file.buffer, extension, medicalResultPath);

        const directory = signaturePath({ dni: doctor.dni });
        const signature = `${directory}/${doctor.dni}.png`;

        const newKey = await this.externalKeyService.create({ key, source });
        const newResult = await this.repository.create({
            filePath: filePath,
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
}