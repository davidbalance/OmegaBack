import { QueryHandlerAsync } from "@shared/shared/application";
import { ClientRecordRepository } from "../../repository/model.repositories";
import { FileOperation } from "@shared/shared/providers";
import { RecordNotFoundError } from "@omega/medical/core/domain/client/errors/record.errors";
import { RECORD_STATUS_COMPLETED } from "@omega/medical/core/domain/client/record.domain";

export type ClientRecordFindOneFileQueryPayload = {
    recordId: string;
};
export interface ClientRecordFindOneFileQuery extends QueryHandlerAsync<ClientRecordFindOneFileQueryPayload, Buffer> { }

export class ClientRecordFindOneFileQueryImpl implements ClientRecordFindOneFileQuery {
    constructor(
        private readonly repository: ClientRecordRepository,
        private readonly file: FileOperation
    ) { }

    async handleAsync(query: ClientRecordFindOneFileQueryPayload): Promise<Buffer> {
        const data = await this.repository.findOneAsync([{ field: 'recordId', operator: 'eq', value: query.recordId }]);
        if (!data) throw new RecordNotFoundError(query.recordId);

        if (data.status != RECORD_STATUS_COMPLETED) throw new RecordNotFoundError(query.recordId);

        const buffer = await this.file.read(data.recordFilepath);
        return buffer;
    }
}