import { QueryHandlerAsync } from "@shared/shared/application";
import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { OrderExternalConnectionRepository, OrderRepository } from "../../repository/model.repositories";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderExternalKeyNotFoundError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";

export type OrderFindOneByExternalKeyQueryPayload = ExternalKeyProps;

export interface OrderFindOneByExternalKeyQuery extends QueryHandlerAsync<OrderFindOneByExternalKeyQueryPayload, OrderModel> { }

export class OrderFindOneByExternalKeyQueryImpl implements OrderFindOneByExternalKeyQuery {
    constructor(
        private readonly externalConnectionRepository: OrderExternalConnectionRepository,
        private readonly modelRepository: OrderRepository
    ) { }

    async handleAsync(query: OrderFindOneByExternalKeyQueryPayload): Promise<OrderModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'orderExternalOwner', operator: 'eq', value: query.owner },
            { field: 'orderExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new OrderExternalKeyNotFoundError(query.owner, query.value);

        const test = await this.modelRepository.findOneAsync([{ field: 'orderId', operator: 'eq', value: value.orderId }]);
        if (!test) throw new OrderNotFoundError(value.orderId);

        return test;
    }
}