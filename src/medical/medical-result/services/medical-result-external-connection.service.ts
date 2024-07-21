import { Inject, Injectable } from "@nestjs/common";
import { ExternalConnectionService as MedicalOrderExternalConnectionService } from "@/medical/medical-order/services/external-connection.service";
import { MedicalResult } from "../entities/medical-result.entity";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { POSTMedicalResultExternalConnectionRequestDto } from "../dtos/post.medical-result-external-connection.dto";
import { signaturePath } from "@/shared/utils";
import path from "path";
import { MedicalResultEventService } from "./medical-result-event.service";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { MedicalResultExternalKeyService } from "./medical-result-external-key.service";
import { PATCHMedicalResultFileRequestDto } from "../dtos/patch.medical-result.dto";

type RequestType = POSTMedicalResultExternalConnectionRequestDto | PATCHMedicalResultFileRequestDto

@Injectable()
export class MedicalResultExternalConnectionService implements IExternalConnectionService<RequestType, MedicalResult> {
    constructor(
        @Inject(MedicalResultExternalKeyService) private readonly externalkey: MedicalResultExternalKeyService,
        @Inject(MedicalResultEventService) private readonly eventService: MedicalResultEventService,
        @Inject(MedicalOrderExternalConnectionService) private readonly orderService: MedicalOrderExternalConnectionService,
        @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
        @Inject(MedicalResultFileManagementService) private readonly storage: MedicalResultFileManagementService,
    ) { }

    async findOne({ key, source }: ExternalKeyParam): Promise<MedicalResult> {
        const medicalResult = await this.repository.findOne({ where: { externalKey: { key, source } } });
        return medicalResult;
    }

    async create({ source, key, order, doctor, exam, file }: POSTMedicalResultExternalConnectionRequestDto): Promise<MedicalResult> {
        const foundOrder = await this.orderService.findOneOrCreate({ source, key, ...order });

        const directory = signaturePath({ dni: doctor.dni });
        const signature = path.join(path.resolve(directory), `${doctor.dni}.png`);

        const newKey = await this.externalkey.create({ key, source });

        try {
            const newResult = await this.repository.create({
                order: foundOrder,
                externalKey: newKey,
                doctorDni: doctor.dni,
                doctorFullname: `${doctor.name} ${doctor.lastname}`,
                doctorSignature: signature,
                examName: exam.name,
            });

            this.eventService.emitMedicalResultCreateEvent(doctor, { ...exam, source, key });

            if (file) {
                await this.storage.uploadFile(newResult.id, file);
            }

            return newResult;
        } catch (error) {
            this.externalkey.remove({ source, key });
            throw error;
        }
    }

    findOneOrCreate(body: POSTMedicalResultExternalConnectionRequestDto): Promise<MedicalResult> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ key, source }: ExternalKeyParam, { file }: PATCHMedicalResultFileRequestDto): Promise<MedicalResult> {
        const medicalResult = await this.repository.findOne({
            where: {
                externalKey: { key, source }
            }
        });
        await this.storage.uploadFile(medicalResult.id, file);
        return medicalResult;
    }
}
