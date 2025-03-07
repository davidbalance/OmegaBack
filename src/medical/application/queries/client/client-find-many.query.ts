import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { PaginationResponse } from "@shared/shared/nest/pagination_response";
import { ClientRepository } from "../../repository/model.repositories";

export type ClientFindManyQueryPayload = {
    companyRuc?: string;
    filter?: string;
} & Required<Pagination> & Order<ClientModel>
export class ClientFindManyQuery implements QueryHandlerAsync<ClientFindManyQueryPayload, PaginationResponse<ClientModel>> {
    constructor(
        private readonly repository: ClientRepository,
    ) { }

    async handleAsync(query: ClientFindManyQueryPayload): Promise<PaginationResponse<ClientModel>> {
        const Orfilter: Filter<ClientModel>[] = []
        const filter: Filter<ClientModel>[] = []
        if (query.filter) {
            Orfilter.push(
                { field: 'patientDni', operator: 'like', value: query.filter },
                { field: 'patientName', operator: 'like', value: query.filter },
                { field: 'patientLastname', operator: 'like', value: query.filter },
                { field: 'patientRole', operator: 'like', value: query.filter })
        }
        if (query.companyRuc) {
            filter.push({ field: 'companyRuc', operator: 'eq', value: query.companyRuc });
        }

        const data = await this.repository.findManyAsync({
            ...query,
            filter: [
                {
                    operator: "or",
                    filter: Orfilter
                },
                ...filter]
        });
        const amount = await this.repository.countAsync([
            {
                operator: "or",
                filter: Orfilter
            },
            ...filter]);
        return { data, amount };
    }
}