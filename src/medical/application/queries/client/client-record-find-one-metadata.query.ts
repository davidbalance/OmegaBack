import { QueryHandlerAsync } from "@shared/shared/application";
import { ClientRecordRepository } from "../../repository/model.repositories";
import { RecordNotFoundError } from "@omega/medical/core/domain/client/errors/record.errors";
import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";

export type ClientRecordFindOneMetadataQueryPayload = {
    recordId: string;
};
export interface ClientRecordFindOneMetadataQuery extends QueryHandlerAsync<ClientRecordFindOneMetadataQueryPayload, ClientRecordModel> { }

export class ClientRecordFindOneMetadataQueryImpl implements ClientRecordFindOneMetadataQuery {
    constructor(
        private readonly repository: ClientRecordRepository,
    ) { }

    async handleAsync(query: ClientRecordFindOneMetadataQueryPayload): Promise<ClientRecordModel> {
        const data = await this.repository.findOneAsync([{ field: 'recordId', operator: 'eq', value: query.recordId }]);
        if (!data) throw new RecordNotFoundError(query.recordId);
        return data;
    }
}