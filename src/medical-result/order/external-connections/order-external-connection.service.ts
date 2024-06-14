import { Inject, Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { OrderExternalKeyService } from "../order-external-key/order-external-key.service";
import { OrderRepository } from "../order.repository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { OrderEvent, OrderFindOrCreateBranchEvent, OrderFindOrCreatePatientEvent } from "@/shared";
import { PATCHMedicalOrderRequestDTO, POSTMedicalOrderRequestDTO } from "@/medical-result/common/dtos/order-external-connection.request.dto";

@Injectable()
export class OrderExternalConnectionService {
    constructor(
        @Inject(OrderExternalKeyService) private readonly externalKeyService: OrderExternalKeyService,
        @Inject(OrderRepository) private readonly repository: OrderRepository,
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    /**
     * Creates a new order with the given values
     * @param param0 
     * @returns Order
     */
    async create({ key, source, branch, patient, ...order }: POSTMedicalOrderRequestDTO & { source: string }): Promise<Order> {
        const { company } = branch;
        const { corporativeGroup } = company;
        const newKey = await this.externalKeyService.create({ key, source });
        const newOrder = await this.repository.create({
            ...order,
            patientBirthday: patient.birthday,
            patientDni: patient.dni,
            patientEmail: patient.email,
            patientFullname: `${patient.lastname} ${patient.name}`,
            companyRuc: company.ruc,
            companyName: company.name,
            corporativeName: corporativeGroup.name,
            branchName: branch.name,
            externalKey: newKey
        });

        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_PATIENT, new OrderFindOrCreatePatientEvent({ source, ...patient }));
        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_BRANCH, new OrderFindOrCreateBranchEvent({ source, ...branch }));
        return newOrder;
    }

    /**
     * Find one order if not exists creates one with the given values
     * @param param0 
     * @returns Order
     */
    async findOneOrCreate({ key, source, branch, patient, ...order }: POSTMedicalOrderRequestDTO & { source: string }): Promise<Order> {
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
     * Find one order and updates it with the given options
     * @param param0 
     * @param param1 
     * @returns Order
     */
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHMedicalOrderRequestDTO): Promise<Order> {
        const order = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return order;
    }
}