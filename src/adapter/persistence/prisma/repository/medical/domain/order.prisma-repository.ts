import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { Order, OrderProps } from "@omega/medical/core/domain/order/order.domain";
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { OrderIsEvent, OrderMailSendedEventPayload, OrderStatusChangedToValidatedEventPayload, OrderStatusChangedToCreatedEventPayload } from "@omega/medical/core/domain/order/events/order.events";
import { OrderDomainMapper } from "../../../mapper/medical/domain/order.domain-mapper";
import { OrderAggregateRepositoryToken } from "@omega/medical/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { OrderRemoveCommandPayload } from "@omega/medical/application/commands/order/order-remove.command";
import { OrderExternalKey, OrderExternalKeyProps } from "@omega/medical/core/domain/order/value_objects/order-external-key.value-object";

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<OrderProps>): Promise<Order | null> {
        try {
            const where = PrismaFilterMapper.map<OrderProps, Prisma.MedicalOrderWhereInput>(filter.filter);
            const value = await this.prisma.medicalOrder.findFirst({ where: where, include: { externalKeys: true } });
            return value ? OrderDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Order): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Order>(event))
                await this.createOrder(aggregate);

            else if (OrderIsEvent.isOrderMailSendedEvent(event))
                await this.editOrder(event.value);

            else if (OrderIsEvent.isOrderStatusChangedToCreatedEvent(event))
                await this.changeToCreated(event.value);

            else if (OrderIsEvent.isOrderStatusChangedToValidatedEvent(event))
                await this.changeToValidated(event.value);

            else if (OrderIsEvent.isOrderRemovedEvent(event))
                await this.removeOrder(event.value);

            else if (OrderIsEvent.isOrderExternalKeyAddedEvent(event))
                await this.addOrderExternalKey(event.value);
        }
    }

    async createOrder(value: Order): Promise<void> {
        try {
            const data = OrderDomainMapper.toPrisma(value);
            await this.prisma.medicalOrder.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async editOrder(value: OrderMailSendedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalOrder.update({ where: { id: value.orderId }, data: { email: true } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async changeToCreated(value: OrderStatusChangedToCreatedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalOrder.update({ where: { id: value.orderId }, data: { status: "created" } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async changeToValidated(value: OrderStatusChangedToValidatedEventPayload): Promise<void> {
        try {
            await this.prisma.medicalOrder.update({ where: { id: value.orderId }, data: { status: "validated" } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeOrder(value: OrderRemoveCommandPayload): Promise<void> {
        try {
            await this.prisma.medicalOrder.update({ where: { id: value.orderId }, data: { isActive: false } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addOrderExternalKey(value: OrderExternalKey): Promise<void> {
        try {
            await this.prisma.medicalOrderExternalKey.create({
                data: { owner: value.owner, value: value.value, orderId: value.orderId }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

}

export const OrderAggregateRepositoryProvider: Provider = {
    provide: OrderAggregateRepositoryToken,
    useClass: OrderPrismaRepository,
}