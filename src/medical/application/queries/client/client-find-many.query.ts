import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";
import { ClientRepository } from "../../repository/model.repositories";

export type ClientFindManyQueryPayload = {
    companies?: {
        corporativeName: string;
        companyRuc: string;
    }[];
    filter?: string;
} & Required<Pagination> & Order<ClientModel>
export interface ClientFindManyQuery extends QueryHandlerAsync<ClientFindManyQueryPayload, PaginationResponse<ClientModel>> { }

export class ClientFindManyQueryImpl implements ClientFindManyQuery {
    constructor(
        private readonly repository: ClientRepository,
    ) { }

    async handleAsync(query: ClientFindManyQueryPayload): Promise<PaginationResponse<ClientModel>> {
        const orfilter: Filter<ClientModel>[] = []
        const filter: Filter<ClientModel>[] = []
        if (query.filter) {
            orfilter.push(
                { field: 'patientDni', operator: 'like', value: query.filter },
                { field: 'patientName', operator: 'like', value: query.filter },
                { field: 'patientLastname', operator: 'like', value: query.filter },
                { field: 'patientRole', operator: 'like', value: query.filter })
        }

        if (query.companies && query.companies.length > 0) {
            filter.push({ field: "companyRuc", operator: "in", value: query.companies.map(e => e.companyRuc) })
        }

        const data = await this.repository.findManyAsync({
            ...query,
            filter: [
                {
                    operator: "or",
                    filter: orfilter
                },
                ...filter]
        });
        const amount = await this.repository.countAsync([
            {
                operator: "or",
                filter: orfilter
            },
            ...filter]);
        return { data, amount };
    }
}