import { QueryHandlerAsync } from "@shared/shared/application";
import { FilterGroup, Order, Pagination } from "@shared/shared/domain";
import { OrderPatientModel } from "@omega/medical/core/model/order/order-patient.model";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";
import { OrderPatientRepository } from "../../repository/model.repositories";

export type OrderPatientFindManyQueryPayload = {
    filter?: string;
} & Required<Pagination> & Order<OrderPatientModel>;
export class OrderPatientFindManyQuery implements QueryHandlerAsync<OrderPatientFindManyQueryPayload, PaginationResponse<OrderPatientModel>> {
    constructor(
        private readonly repository: OrderPatientRepository
    ) { }

    async handleAsync(query: OrderPatientFindManyQueryPayload): Promise<PaginationResponse<OrderPatientModel>> {
        const filter: FilterGroup<OrderPatientModel>[] = [];
        if (query.filter) {
            filter.push({
                operator: "or",
                filter: [
                    { field: 'locationCompanyRuc', operator: 'like', value: query.filter },
                    { field: 'locationCompanyName', operator: 'like', value: query.filter },
                    { field: 'patientName', operator: 'like', value: query.filter },
                    { field: 'patientLastname', operator: 'like', value: query.filter },
                    { field: 'patientDni', operator: 'like', value: query.filter },
                ]
            });
        }
        const data = await this.repository.findManyAsync({
            filter: filter,
            skip: query.skip,
            limit: query.limit,
            order: query.order
        });

        const amount = await this.repository.countAsync(filter);
        return { data, amount }
    }
}