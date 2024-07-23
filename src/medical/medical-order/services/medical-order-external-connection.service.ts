import { Injectable, Inject, Provider } from "@nestjs/common";
import { MedicalOrder } from "../entities/medical-order.entity";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderExternalKeyService } from "./medical-order-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { MedicalOrderEventService } from "./medical-order-event.service";
import { PatchMedicalOrderRequestDto } from "../dtos/request/patch.medical-order.request.dto";
import { PostMedicalOrderExternalRequestDto } from "../dtos/request/post.medical-order-external.request.dto";
import { MedicalClientService } from "@/medical/medical-client/services/medical-client.service";

type ConnectionRequestType = PostMedicalOrderExternalRequestDto | PatchMedicalOrderRequestDto;

@Injectable()
export class MedicalOrderExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, MedicalOrder> {
    constructor(
        @Inject(MedicalOrderExternalKeyService) private readonly externalkey: MedicalOrderExternalKeyService,
        @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
        @Inject(MedicalClientService) private readonly clientService: MedicalClientService,
        @Inject(MedicalOrderEventService) private readonly eventService: MedicalOrderEventService
    ) { }

    async findOne({ key, source }: ExternalKeyParam): Promise<MedicalOrder> {
        const order = await this.repository.findOne({ where: { externalKey: { source, key } } });
        return order;
    }

    async create(key: ExternalKeyParam, { branch, patient, ...data }: PostMedicalOrderExternalRequestDto): Promise<MedicalOrder> {
        const newClient = await this.clientService.findOneOrCreate({ ...patient, fullname: `${patient.lastname} ${patient.name}` });

        try {
            const newKey = await this.externalkey.create(key);
            const newOrder = await this.repository.create({
                ...data,
                companyRuc: branch.company.ruc,
                companyName: branch.company.name,
                corporativeName: branch.company.corporativeGroup.name,
                branchName: branch.name,
                externalKey: newKey,
                client: newClient,
            });

            this.eventService.emitMedicalOrderCreateEvent(key.source, patient, branch);
            return newOrder;
        } catch (error) {
            this.externalkey.remove(key)
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam, data: PostMedicalOrderExternalRequestDto): Promise<MedicalOrder> {
        try {
            const foundOrder = await this.repository.findOne({ where: { externalKey: key } });
            return foundOrder;
        } catch (error) {
            return this.create(key, data);
        }
    }

    async findOneAndUpdate(key: ExternalKeyParam, data: PatchMedicalOrderRequestDto): Promise<MedicalOrder> {
        const order = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return order;
    }
}

export const INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION = 'INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION';
export const MedicalOrderExternalConnectionProvider: Provider = { provide: INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION, useClass: MedicalOrderExternalConnectionService }