import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Order, Pagination } from "@shared/shared/domain";
import { ClientRepository } from "../../repository/model.repositories";

export type ClientFindManyByCompanyRucQueryPayload = {
    filter: string;
    companyRuc: string;
} & Required<Pagination> & Order<ClientModel>
export class ClientFindManyByCompanyRucQuery implements QueryHandlerAsync<ClientFindManyByCompanyRucQueryPayload, ClientModel[]> {
    constructor(
        private readonly repository: ClientRepository,
    ) { }

    async handleAsync(query: ClientFindManyByCompanyRucQueryPayload): Promise<ClientModel[]> {
        return this.repository.findManyAsync({
            ...query,
            filter: [{
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