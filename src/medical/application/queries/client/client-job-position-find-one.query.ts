import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientJobPositionModel } from "@omega/medical/core/model/client/client-job-position.model";

export type ClientJobPositionFindOneQueryPayload = {
    patientDni: string;
};
export class ClientJobPositionFindOneQuery implements QueryHandlerAsync<ClientJobPositionFindOneQueryPayload, ClientJobPositionModel> {
    constructor(
        private readonly repository: ModelRepository<ClientJobPositionModel>
    ) { }

    async handleAsync(query: ClientJobPositionFindOneQueryPayload): Promise<ClientJobPositionModel> {
        const value = await this.repository.findOneAsync([{ field: 'patientDni', operator: 'eq', value: query.patientDni }]);
        if (!value) throw new ClientNotFoundError(query.patientDni);
        return value;

    }
}