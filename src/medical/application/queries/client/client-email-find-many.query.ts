import { QueryHandlerAsync } from "@shared/shared/application";
import { ClientEmailModel } from "@omega/medical/core/model/client/client-email.model";
import { ClientEmailRepository } from "../../repository/model.repositories";

export type ClientEmailFindManyQueryPayload = {
    patientDni: string;
};
export interface ClientEmailFindManyQuery extends QueryHandlerAsync<ClientEmailFindManyQueryPayload, ClientEmailModel[]> { }

export class ClientEmailFindManyQueryImpl implements ClientEmailFindManyQuery {
    constructor(
        private readonly repository: ClientEmailRepository
    ) { }

    async handleAsync(query: ClientEmailFindManyQueryPayload): Promise<ClientEmailModel[]> {
        return this.repository.findManyAsync({
            filter: [{ field: 'patientDni', operator: 'eq', value: query.patientDni }],
        })
    }
}