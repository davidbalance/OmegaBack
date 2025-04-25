import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientManagementModel } from "@omega/medical/core/model/client/client-management.model";

export type ClientManagementFindOneQueryPayload = {
    patientDni: string;
};
export interface ClientManagementFindOneQuery extends QueryHandlerAsync<ClientManagementFindOneQueryPayload, ClientManagementModel> { }

export class ClientManagementFindOneQueryImpl implements QueryHandlerAsync<ClientManagementFindOneQueryPayload, ClientManagementModel> {
    constructor(
        private readonly repository: ModelRepository<ClientManagementModel>
    ) { }

    async handleAsync(query: ClientManagementFindOneQueryPayload): Promise<ClientManagementModel> {
        const value = await this.repository.findOneAsync([{ field: 'patientDni', operator: 'eq', value: query.patientDni }]);
        if (!value) throw new ClientNotFoundError(query.patientDni);
        return value;

    }
}