import { QueryHandlerAsync } from "@shared/shared/application";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientRepository } from "../../repository/model.repositories";

export type ClientFindOneByDniQueryPayload = {
    patientDni: string;
}
export interface ClientFindOneByDniQuery extends QueryHandlerAsync<ClientFindOneByDniQueryPayload, ClientModel> { }

export class ClientFindOneByDniQueryImpl implements QueryHandlerAsync<ClientFindOneByDniQueryPayload, ClientModel> {
    constructor(
        private readonly repository: ClientRepository
    ) { }

    async handleAsync(query: ClientFindOneByDniQueryPayload): Promise<ClientModel> {
        const value = await this.repository.findOneAsync([{ field: 'patientDni', operator: 'eq', value: query.patientDni }]);
        if (!value) throw new ClientNotFoundError(query.patientDni);
        return value;
    }
}