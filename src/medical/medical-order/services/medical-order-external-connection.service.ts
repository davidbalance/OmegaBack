import { Injectable, Inject, Provider } from "@nestjs/common";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderExternalKeyService } from "./medical-order-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { MedicalOrderEventService } from "./medical-order-event.service";
import { MedicalClientExternalService } from "@/medical/medical-client/services/medical-client-external.service";
import { PostExternalMedicalOrderRequestDto } from "../dtos/request/external-medical-order.post.dto";
import { PatchExternalMedicalOrderRequestDto } from "../dtos/request/external-medical-order.patch.dto";
import { ExternalMedicalOrder } from "../dtos/response/external-medical-order.base.dto";
import { MedicalOrderFileManagementService } from "./medical-order-file-management.service";
import { MedicalOrderEntity } from "../entities/medical-order.entity";
import { PatchExternalMedicalOrderFileRequestDto } from "../dtos/request/external-medical-order-file-upload.patch.dto";
import { PatchExternalMedicalOrderBase64RequestDto } from "../dtos/request/external-medical-order-file-base64.patch.dto";

type ConnectionRequestType = PostExternalMedicalOrderRequestDto | PatchExternalMedicalOrderRequestDto;

@Injectable()
export class MedicalOrderExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, ExternalMedicalOrder> {
    constructor(
        @Inject(MedicalOrderExternalKeyService) private readonly externalkey: MedicalOrderExternalKeyService,
        @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
        @Inject(MedicalClientExternalService) private readonly clientService: MedicalClientExternalService,
        @Inject(MedicalOrderEventService) private readonly eventService: MedicalOrderEventService,
        @Inject(MedicalOrderFileManagementService) private readonly storage: MedicalOrderFileManagementService
    ) { }

    async find(dni: string): Promise<ExternalMedicalOrder[]> {
        return await this.repository.find({ where: { client: { dni } }, relations: { results: { report: true } } })
    }

    async create(key: ExternalKeyParam, { branch, patient, jobPosition, ...data }: PostExternalMedicalOrderRequestDto): Promise<ExternalMedicalOrder> {
        const { id: client } = await this.clientService.findOneOrCreate(key.source, { ...patient, jobPosition });
        const newKey = await this.externalkey.create(key);
        try {
            const newOrder = await this.repository.create({
                ...data,
                companyRuc: branch.company.ruc,
                companyName: branch.company.name,
                corporativeName: branch.company.corporativeGroup.name,
                branchName: branch.name,
                externalKey: newKey,
                client: { id: client },
            });
            this.eventService.emitMedicalOrderCreateEvent(key.source, branch);
            return newOrder;
        } catch (error) {
            await this.externalkey.remove(key)
            throw error;
        }
    }

    async findOne(value: ExternalKeyParam | number): Promise<ExternalMedicalOrder> {
        if (typeof value === 'number') {
            const order = await this.repository.findOne({ where: { id: value } });
            return order;
        } else {
            const { key, source } = value;
            const order = await this.repository.findOne({ where: { externalKey: { source, key } } });
            return order;
        }

    }

    async findOneOrCreate(key: ExternalKeyParam, data: PostExternalMedicalOrderRequestDto): Promise<ExternalMedicalOrder> {
        try {
            const foundOrder = await this.repository.findOne({ where: { externalKey: key } });
            return foundOrder;
        } catch (error) {
            return this.create(key, data);
        }
    }

    async findOneAndUpdate(key: ExternalKeyParam, data: PatchExternalMedicalOrderRequestDto): Promise<ExternalMedicalOrder> {
        const order = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return order;
    }

    async findOneAndUpload(key: ExternalKeyParam | number, { file }: PatchExternalMedicalOrderFileRequestDto): Promise<ExternalMedicalOrder> {
        let medicalOrder: MedicalOrderEntity;
        if (typeof key === 'number') {
            medicalOrder = await this.repository.findOne({ where: { id: key } });
        } else {
            medicalOrder = await this.repository.findOne({ where: { externalKey: key } });
        }
        await this.storage.uploadFile(medicalOrder.id, file);
        medicalOrder.hasFile = true;
        return medicalOrder;
    }

    async findOneAndUploadBase64(key: ExternalKeyParam | number, { mimetype, base64 }: PatchExternalMedicalOrderBase64RequestDto): Promise<ExternalMedicalOrder> {
        let medicalOrder: MedicalOrderEntity;
        if (typeof key === 'number') {
            medicalOrder = await this.repository.findOne({ where: { id: key } });
        } else {
            medicalOrder = await this.repository.findOne({ where: { externalKey: key } });
        }
        await this.storage.uploadFromBase64(medicalOrder.id, mimetype, base64);
        medicalOrder.hasFile = true;
        return medicalOrder;
    }
}

export const INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION = 'INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION';
export const MedicalOrderExternalConnectionProvider: Provider = { provide: INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION, useClass: MedicalOrderExternalConnectionService }