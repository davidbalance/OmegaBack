import { QueryHandlerAsync } from "@shared/shared/application";
import { ClientRecordRepository } from "../../repository/model.repositories";
import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { Filter } from "@shared/shared/domain";

export type ClientRecordFindManyQueryPayload = {
    patientDni: string;
    filter?: string;
};
export interface ClientRecordFindManyQuery extends QueryHandlerAsync<ClientRecordFindManyQueryPayload, ClientRecordModel[]> { }

export class ClientRecordFindManyQueryImpl implements ClientRecordFindManyQuery {
    constructor(
        private readonly repository: ClientRecordRepository
    ) { }

    async handleAsync(query: ClientRecordFindManyQueryPayload): Promise<ClientRecordModel[]> {
        const filter: Filter<ClientRecordModel>[] = [{ field: 'patientDni', operator: 'eq', value: query.patientDni }];
        if (query.filter) {
            filter.push({ field: 'recordName', operator: 'like', value: query.filter });
        }
        const values = await this.repository.findManyAsync({
            filter: filter,
            order: {
                recordEmissionDate: 'desc'
            }
        });
        return values;
    }
}