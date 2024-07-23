import { Inject, Injectable } from "@nestjs/common";
import { MedicalResult } from "../entities/medical-result.entity";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { signaturePath } from "@/shared/utils";
import path from "path";
import { MedicalResultEventService } from "./medical-result-event.service";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { MedicalResultExternalKeyService } from "./medical-result-external-key.service";
import { INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION } from "@/medical/medical-order/services/medical-order-external-connection.service";
import { PostMedicalResultExternalRequestDto } from "../dtos/request/post.medical-result-external.dto";
import { PatchMedicalResultFileRequestDto } from "../dtos/request/patch.medical-result-file.request.dto";
import { MedicalOrder } from "@/medical/medical-order/entities/medical-order.entity";
import { PostMedicalOrderExternalRequestDto } from "@/medical/medical-order/dtos/request/post.medical-order-external.request.dto";

type RequestType = PostMedicalResultExternalRequestDto | PatchMedicalResultFileRequestDto

@Injectable()
export class MedicalResultExternalConnectionService implements IExternalConnectionService<RequestType, MedicalResult> {
    constructor(
        @Inject(MedicalResultExternalKeyService) private readonly externalkey: MedicalResultExternalKeyService,
        @Inject(MedicalResultEventService) private readonly eventService: MedicalResultEventService,
        @Inject(INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION) private readonly orderService: IExternalConnectionService<PostMedicalOrderExternalRequestDto, MedicalOrder>,
        @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
        @Inject(MedicalResultFileManagementService) private readonly storage: MedicalResultFileManagementService,
    ) { }

    async findOne(key: ExternalKeyParam): Promise<MedicalResult> {
        const medicalResult = await this.repository.findOne({ where: { externalKey: key } });
        return medicalResult;
    }

    async create(key: ExternalKeyParam, { doctor, exam, order, file }: PostMedicalResultExternalRequestDto): Promise<MedicalResult> {
        const { key: medicalOrderKey, ...orderData } = order;
        const foundOrder = await this.orderService.findOneOrCreate({ ...key, key: medicalOrderKey }, orderData);

        const directory = signaturePath({ dni: doctor.dni });
        const signature = path.join(path.resolve(directory), `${doctor.dni}.png`);

        const newKey = await this.externalkey.create(key);
        try {
            const newResult = await this.repository.create({
                order: foundOrder,
                externalKey: newKey,
                doctorDni: doctor.dni,
                doctorFullname: `${doctor.name} ${doctor.lastname}`,
                doctorSignature: signature,
                examName: exam.name,
                examType: exam.type.name,
                examSubtype: exam.subtype.name || null
            });

            const { source } = key;
            this.eventService.emitMedicalResultCreateEvent(source, doctor, exam);
            if (file) {
                await this.storage.uploadFile(newResult.id, file);
            }
            return newResult;
        } catch (error) {
            this.externalkey.remove(key);
            throw error;
        }
    }

    findOneOrCreate(body: PostMedicalResultExternalRequestDto): Promise<MedicalResult> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate(key: ExternalKeyParam, { file }: PatchMedicalResultFileRequestDto): Promise<MedicalResult> {
        const medicalResult = await this.repository.findOne({ where: { externalKey: key } });
        await this.storage.uploadFile(medicalResult.id, file);
        return medicalResult;
    }
}
