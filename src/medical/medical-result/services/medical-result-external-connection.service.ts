import { Inject, Injectable, Provider } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { signaturePath } from "@/shared/utils";
import path from "path";
import { MedicalResultEventService } from "./medical-result-event.service";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { MedicalResultExternalKeyService } from "./medical-result-external-key.service";
import { INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION } from "@/medical/medical-order/services/medical-order-external-connection.service";
import { PostExternalMedicalResultRequestDto } from "../dtos/request/external-medical-result.post.dto";
import { ExternalMedicalResult } from "../dtos/response/external-medical-result.base.dto";
import { PatchExternalMedicalResultRequestDto } from "../dtos/request/external-medical-result.patch.dto";
import { ExternalMedicalOrder } from "@/medical/medical-order/dtos/response/external-medical-order.base.dto";
import { ExternalMedicalOrderRequestDto } from "@/medical/medical-order/dtos/request/external-medical-order.base.dto";
import { MedicalResultEntity } from "../entities/medical-result.entity";
import { PostMedicalResultBase64FileRequestDto } from "../dtos/request/external-medical-result-base64-file.post.dto";

type RequestType = PostExternalMedicalResultRequestDto | PatchExternalMedicalResultRequestDto

@Injectable()
export class MedicalResultExternalConnectionService implements IExternalConnectionService<RequestType, ExternalMedicalResult> {
    constructor(
        @Inject(MedicalResultExternalKeyService) private readonly externalkey: MedicalResultExternalKeyService,
        @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
        @Inject(MedicalResultFileManagementService) private readonly storage: MedicalResultFileManagementService,
        @Inject(MedicalResultEventService) private readonly eventService: MedicalResultEventService,
        @Inject(INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION) private readonly orderService: IExternalConnectionService<ExternalMedicalOrderRequestDto, ExternalMedicalOrder>,
    ) { }

    async create(key: ExternalKeyParam, { doctor, exam, order, file }: PostExternalMedicalResultRequestDto): Promise<ExternalMedicalResult> {
        const { key: medicalOrderKey, ...orderData } = order;
        const { id: orderId } = await this.orderService.findOneOrCreate({ ...key, key: medicalOrderKey }, orderData);
        
        const directory = signaturePath({ dni: doctor.dni });
        const signature = path.join(path.resolve(directory), `${doctor.dni}.png`);
        
        let newKey = undefined;
        if (key.key) {
            newKey = await this.externalkey.create(key);
        }
        try {
            const newResult = await this.repository.create({
                order: { id: orderId },
                externalKey: newKey,
                doctorDni: doctor.dni,
                doctorFullname: `${doctor.name} ${doctor.lastname}`,
                doctorSignature: signature,
                examName: exam.name,
                examType: exam.type ? exam.type.name : null,
                examSubtype: exam.subtype ? exam.subtype.name : null
            });
            
            const { source } = key;
            this.eventService.emitMedicalResultCreateEvent(source, doctor, exam);
            if (file) {
                await this.storage.uploadFile(newResult.id, file);
                newResult.hasFile = true;
            }
            return newResult;
        } catch (error) {
            this.externalkey.remove(key);
            throw error;
        }
    }

    async findOne(key: ExternalKeyParam): Promise<ExternalMedicalResult> {
        const medicalResult = await this.repository.findOne({ where: { externalKey: key } });
        return medicalResult;
    }

    findOneOrCreate(body: PostExternalMedicalResultRequestDto): Promise<ExternalMedicalResult> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate(key: ExternalKeyParam | number, { file }: PatchExternalMedicalResultRequestDto): Promise<ExternalMedicalResult> {
        let medicalResult: MedicalResultEntity;
        if (typeof key === 'number') {
            medicalResult = await this.repository.findOne({ where: { id: key } });
        } else {
            medicalResult = await this.repository.findOne({ where: { externalKey: key } });
        }
        await this.storage.uploadFile(medicalResult.id, file);
        medicalResult.hasFile = true;
        return medicalResult;
    }

    async findOneAndUploadBas64(key: ExternalKeyParam | number, { base64, mimetype }: PostMedicalResultBase64FileRequestDto): Promise<ExternalMedicalResult> {
        let medicalResult: MedicalResultEntity;
        if (typeof key === 'number') {
            medicalResult = await this.repository.findOne({ where: { id: key } });
        } else {
            medicalResult = await this.repository.findOne({ where: { externalKey: key } });
        }
        await this.storage.uploadFromBase64(medicalResult.id, mimetype, base64);
        medicalResult.hasFile = true;
        return medicalResult;
    }
}

export const INJECT_MEDICAL_RESULT_EXTERNAL_CONNECTION = 'INJECT_MEDICAL_RESULT_EXTERNAL_CONNECTION';
export const MedicalResultExternalConnectionProvider: Provider = { provide: INJECT_MEDICAL_RESULT_EXTERNAL_CONNECTION, useClass: MedicalResultExternalConnectionService }