import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientModel } from "@omega/medical/core/model/client/client.model";

export type ClientFindOneQueryPayload = {
    clientId: string;
}
export interface ClientFindOneQuery extends QueryHandlerAsync<ClientFindOneQueryPayload, ClientModel> { }

export class ClientFindOneQueryImpl implements ClientFindOneQuery {
    constructor(
        private readonly repository: ModelRepository<ClientModel>
    ) { }

    async handleAsync(query: ClientFindOneQueryPayload): Promise<ClientModel> {
        const value = await this.repository.findOneAsync([{ field: 'patientId', operator: 'eq', value: query.clientId }]);
        if (!value) throw new ClientNotFoundError(query.clientId);
        return value;
    }
}