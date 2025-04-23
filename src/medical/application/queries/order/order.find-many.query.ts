import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";
import { OrderRepository } from "../../repository/model.repositories";

export type OrderFindManyQueryPayload = {
    patientDni: string;
    companyRuc?: string;
    filter?: string;
} & Required<Pagination> & Order<OrderModel>;
export class OrderFindManyQuery implements QueryHandlerAsync<OrderFindManyQueryPayload, PaginationResponse<OrderModel>> {
    constructor(
        private readonly repository: OrderRepository
    ) { }

    async handleAsync(query: OrderFindManyQueryPayload): Promise<PaginationResponse<OrderModel>> {
        const filter: Filter<OrderModel>[] = [{ field: 'patientDni', operator: 'eq', value: query.patientDni }];
        if (query.filter) {
            filter.push({ field: 'orderProcess', operator: 'like', value: query.filter });
        }
        if (query.companyRuc) {
            filter.push({ field: 'companyRuc', operator: 'eq', value: query.companyRuc });
        }
        const data = await this.repository.findManyAsync({
            filter: filter,
            skip: query.skip,
            limit: query.limit,
            order: { orderEmissionDate: 'desc' }
        });

        const amount = await this.repository.countAsync(filter);
        return { data, amount };
    }
}