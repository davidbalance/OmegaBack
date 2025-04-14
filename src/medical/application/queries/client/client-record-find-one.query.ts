import { QueryHandlerAsync } from "@shared/shared/application";
import { ClientRecordRepository } from "../../repository/model.repositories";
import { FileOperation } from "@shared/shared/providers";
import { RecordNotFoundError } from "@omega/medical/core/domain/client/errors/record.errors";

export type ClientRecordFindOneQueryPayload = {
    recordId: string;
};
export class ClientRecordFindOneQuery implements QueryHandlerAsync<ClientRecordFindOneQueryPayload, Buffer> {
    constructor(
        private readonly repository: ClientRecordRepository,
        private readonly file: FileOperation
    ) { }

    async handleAsync(query: ClientRecordFindOneQueryPayload): Promise<Buffer> {
        const data = await this.repository.findOneAsync([{ field: 'recordId', operator: 'eq', value: query.recordId }]);
        if (!data) throw new RecordNotFoundError(query.recordId);
        const buffer = await this.file.read(data.recordFilepath);
        return buffer;

    }
}