import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Order, Pagination } from "@shared/shared/domain";
import { ClientRepository } from "../../repository/model.repositories";

export type ClientFindManyByCompanyRucQueryPayload = {
    filter: string;
    companyRuc: string;
} & Required<Pagination> & Order<ClientModel>
export interface ClientFindManyByCompanyRucQuery extends QueryHandlerAsync<ClientFindManyByCompanyRucQueryPayload, ClientModel[]> { }

export class ClientFindManyByCompanyRucQueryImpl implements ClientFindManyByCompanyRucQuery {
    constructor(
        private readonly repository: ClientRepository,
    ) { }

    async handleAsync(query: ClientFindManyByCompanyRucQueryPayload): Promise<ClientModel[]> {
        return this.repository.findManyAsync({
            ...query,
            filter: [
                {
                    operator: "or",
                    filter: [
                        { field: 'patientDni', operator: 'like', value: query.filter },
                        { field: 'patientName', operator: 'like', value: query.filter },
                        { field: 'patientLastname', operator: 'like', value: query.filter },
                        { field: 'patientRole', operator: 'like', value: query.filter },
                    ]
                },
                { field: 'companyRuc', operator: 'eq', value: query.companyRuc }
            ]
        });
    }
}