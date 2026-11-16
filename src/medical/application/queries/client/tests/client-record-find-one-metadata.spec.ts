/* eslint-disable @typescript-eslint/unbound-method */
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { FileOperation } from "@shared/shared/providers";
import { RecordNotFoundError } from "@omega/medical/core/domain/client/errors/record.errors";
import { RECORD_STATUS_COMPLETED, RECORD_STATUS_STARTED } from "@omega/medical/core/domain/client/record.domain";
import { ClientRecordFindOneMetadataQuery, ClientRecordFindOneMetadataQueryImpl, ClientRecordFindOneMetadataQueryPayload } from "../client-record-find-one-metadata.query";

describe("ClientRecordFindOneMetadataQuery", () => {
    let repository: jest.Mocked<ClientRecordRepository>;
    let file: jest.Mocked<FileOperation>;
    let handler: ClientRecordFindOneMetadataQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRecordRepository>;

        handler = new ClientRecordFindOneMetadataQueryImpl(repository);
    });

    it('should return a ClientRecordModel by the id when record exists', async () => {
        const query: ClientRecordFindOneMetadataQueryPayload = { recordId: 'record-id' };

        const mockRecord = { recordFilepath: 'path/to/result-file.pdf', status: RECORD_STATUS_COMPLETED } as unknown as ClientRecordModel;

        repository.findOneAsync.mockResolvedValue(mockRecord);

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'recordId', operator: 'eq', value: query.recordId }]);
        expect(result).toBe(mockRecord);
    });

    it('should throw RecordNotFoundError when record is not found', async () => {
        const query: ClientRecordFindOneMetadataQueryPayload = { recordId: 'record-id' };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(query)).rejects.toThrow(RecordNotFoundError);
    });
});
