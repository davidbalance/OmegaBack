import { MedicalClientService } from "@/medical/medical-client/medical-client.service";
import { Injectable, Inject, Provider } from "@nestjs/common";
import { MedicalOrder } from "../entities/medical-order.entity";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderExternalKeyService } from "./medical-order-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { MedicalOrderEventService } from "./medical-order-event.service";
import { PATCHMedicalOrderProcessRequestDto } from "../dtos/patch.medical-order-external-connection.dto";
import { POSTMedicalOrderWithExternalKeyRequestDto } from "../dtos/post.medical-order-external-connection.dto";

type RequestType = POSTMedicalOrderWithExternalKeyRequestDto | PATCHMedicalOrderProcessRequestDto;

@Injectable()
export class MedicalOrderExternalConnectionService implements IExternalConnectionService<RequestType, MedicalOrder> {
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

    async create({ key, source, branch, patient, ...order }: POSTMedicalOrderWithExternalKeyRequestDto): Promise<MedicalOrder> {
        const { company } = branch;
        const { corporativeGroup } = company;

        const newClient = await this.clientService.findOneOrCreate({ ...patient, fullname: `${patient.lastname} ${patient.name}` });

        try {
            const newKey = await this.externalkey.create({ key, source });
            const newOrder = await this.repository.create({
                ...order,
                companyRuc: company.ruc,
                companyName: company.name,
                corporativeName: corporativeGroup.name,
                branchName: branch.name,
                externalKey: newKey,
                client: newClient,
            });

            // this.eventService.emitMedicalOrderCreateEvent({ key, source }, patient, branch);
            return newOrder;
        } catch (error) {
            this.externalkey.remove({ source, key })
            throw error;
        }
    }

    async findOneOrCreate({ source, key, ...data }: POSTMedicalOrderWithExternalKeyRequestDto): Promise<MedicalOrder> {
        try {
            const foundOrder = await this.repository.findOne({
                where: { externalKey: { source: source, key: key } }
            });
            return foundOrder;
        } catch (error) {
            return this.create({ key, source, ...data });
        }
    }

    async findOneAndUpdate({ key, source }: ExternalKeyParam, data: PATCHMedicalOrderProcessRequestDto): Promise<MedicalOrder> {
        const order = await this.repository.findOneAndUpdate({ externalKey: { source: source, key: key } }, data);
        return order;
    }
}

export const INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION = 'INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION';
export const MedicalOrderExternalConnectionProvider: Provider = { provide: INJECT_MEDICAL_ORDER_EXTERNAL_CONNECTION, useClass: MedicalOrderExternalConnectionService }