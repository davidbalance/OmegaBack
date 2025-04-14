import { QueryHandlerAsync } from "@shared/shared/application";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientAreaModel } from "@omega/medical/core/model/client/client-area.model";
import { ClientAreaRepository } from "../../repository/model.repositories";

export type ClientAreaFindOneQueryPayload = {
    patientDni: string;
};
export class ClientAreaFindOneQuery implements QueryHandlerAsync<ClientAreaFindOneQueryPayload, ClientAreaModel> {
    constructor(
        private readonly repository: ClientAreaRepository
    ) { }

    async handleAsync(query: ClientAreaFindOneQueryPayload): Promise<ClientAreaModel> {
        const value = await this.repository.findOneAsync([{ field: 'patientDni', operator: 'eq', value: query.patientDni }]);
        if (!value) throw new ClientNotFoundError(query.patientDni);
        return value;
    }
}