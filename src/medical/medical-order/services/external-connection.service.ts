import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { OrderEvent, OrderFindOrCreateBranchEvent, OrderFindOrCreatePatientEvent } from "@/shared";
import { ExternalKeyService } from "../external-key/external-key.service";
import { MedicalOrderRepository } from "../medical-order.repository";
import { MedicalOrder } from "../entities/medical-order.entity";
import { MedicalClientService } from "@/medical/medical-client/medical-client.service";
import { PATCHMedicalOrderProcessRequestDto, POSTMedicalOrderExternalConnectionRequestDto } from "../dtos/medical-order-external-connection.request.dto";
import { POSTMedicalOrderRequestDto } from "../dtos/medical-order.request.dto";

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(ExternalKeyService) private readonly externalKeyService: ExternalKeyService,
        @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
        @Inject(MedicalClientService) private readonly client: MedicalClientService,
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    /**
     * Encuentra ordenes medicas dado un paciente medico.
     * @param dni 
     * @returns 
     */
    async findOrdersByPatient(dni: string): Promise<MedicalOrder[]> {
        const orders = await this.repository.find({ where: { client: { dni } } });
        return orders;
    }

    /**
     * Encuentra una orden medica dado una aplicacion de origen y una llave externa.
     * @param source 
     * @param key 
     * @returns 
     */
    async findOrderBySourceAndKey(source: string, key: string): Promise<MedicalOrder> {
        const order = await this.repository.findOne({ where: { externalKey: { source, key } } });
        return order;
    }

    /**
     * Crea una orden medica.
     * @param param0 
     * @returns 
     */
    async create({ key, source, branch, patient, ...order }: POSTMedicalOrderExternalConnectionRequestDto & { source: string }): Promise<MedicalOrder> {
        const { company } = branch;
        const { corporativeGroup } = company;

        const newClient = await this.client.findOneOrCreate({
            birthday: patient.birthday,
            dni: patient.dni,
            email: patient.email,
            fullname: `${patient.lastname} ${patient.name}`
        });

        try {
            const newKey = await this.externalKeyService.create({ key, source });
            const newOrder = await this.repository.create({
                ...order,
                companyRuc: company.ruc,
                companyName: company.name,
                corporativeName: corporativeGroup.name,
                branchName: branch.name,
                externalKey: newKey,
                client: newClient,
            });

            this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_PATIENT, new OrderFindOrCreatePatientEvent({ source, ...patient }));
            this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_BRANCH, new OrderFindOrCreateBranchEvent({ source, ...branch }));
            return newOrder;
        } catch (error) {
            this.externalKeyService.remove({ source, key })
            throw error;
        }
    }

    /**
     * Encuentra una orden medica sino la crea.
     * @param param0 
     * @returns 
     */
    async findOneOrCreate({ key, source, branch, patient, ...order }: POSTMedicalOrderRequestDto & { key: string, source: string }): Promise<MedicalOrder> {
        try {
            const foundOrder = await this.repository.findOne({
                where: {
                    externalKey: {
                        source: source,
                        key: key
                    }
                }
            });
            return foundOrder;
        } catch (error) {
            return this.create({ key, source, branch, patient, ...order });
        }
    }

    /**
     * Encuentra una orden medica y la modifica.
     * @param param0 
     * @param param1 
     * @returns 
     */
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHMedicalOrderProcessRequestDto): Promise<MedicalOrder> {
        const order = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return order;
    }
}