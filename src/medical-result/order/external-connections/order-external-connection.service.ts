import { Inject, Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { CreateOrderExternalRequestDTO, FindOneOrderExternalAndUpdateRequestDTO } from "@/medical-result/common/dtos/order-external-connection.request.dto";
import { OrderExternalKeyService } from "../order-external-key/order-external-key.service";
import { OrderRepository } from "../order.repository";
import { BranchExternalConnectionService } from "@/location/branch/external-connection/branch-external-connection.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { OrderEvent, OrderFindOrCreatePatientEvent } from "@/shared";

@Injectable()
export class OrderExternalConnectionService {
    constructor(
        @Inject(OrderExternalKeyService) private readonly externalKeyService: OrderExternalKeyService,
        @Inject(OrderRepository) private readonly repository: OrderRepository,
        @Inject(BranchExternalConnectionService) private readonly branchService: BranchExternalConnectionService,
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    async create({ key, source, branch, patient, ...order }: CreateOrderExternalRequestDTO & { source: string }): Promise<Order> {
        const foundBranch = await this.branchService.findOneOrCreate({ source, ...branch });
        const { company } = foundBranch;
        const { corporativeGroup } = company;
        const newKey = await this.externalKeyService.create({ key, source });
        const newOrder = await this.repository.create({
            ...order,
            patientBirthday: patient.birthday,
            patientDni: patient.dni,
            patientFullname: `${patient.lastname} ${patient.name}`,
            company: company.ruc,
            corporativeGroup: corporativeGroup.id,
            branch: foundBranch.id,
            externalKey: newKey
        });

        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_PATIENT, new OrderFindOrCreatePatientEvent({ source, ...patient }));
        return newOrder;
    }

    async findOneOrCreate({ key, source, branch, patient, ...order }: CreateOrderExternalRequestDTO & { source: string }): Promise<Order> {
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

    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: FindOneOrderExternalAndUpdateRequestDTO): Promise<Order> {
        const order = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return order;
    }
}