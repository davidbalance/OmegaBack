/* eslint-disable @typescript-eslint/unbound-method */
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { ClientRecordFindOneFileQuery, ClientRecordFindOneFileQueryImpl, ClientRecordFindOneFileQueryPayload } from "../client-record-find-one-file.query";
import { FileOperation } from "@shared/shared/providers";
import { RecordNotFoundError } from "@omega/medical/core/domain/client/errors/record.errors";
import { RECORD_STATUS_COMPLETED, RECORD_STATUS_STARTED } from "@omega/medical/core/domain/client/record.domain";

describe("ClientRecordFindOneFileQuery", () => {
    let repository: jest.Mocked<ClientRecordRepository>;
    let file: jest.Mocked<FileOperation>;
    let handler: ClientRecordFindOneFileQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRecordRepository>;

        file = {
            read: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        handler = new ClientRecordFindOneFileQueryImpl(repository, file);
    });

    it('should return file buffer when record exists', async () => {
        const query: ClientRecordFindOneFileQueryPayload = { recordId: 'record-id' };

        const mockRecord = { recordFilepath: 'path/to/result-file.pdf', status: RECORD_STATUS_COMPLETED } as unknown as ClientRecordModel;
        const mockFileBuffer = Buffer.from('file content');

        repository.findOneAsync.mockResolvedValue(mockRecord);
        file.read.mockResolvedValue(mockFileBuffer);

        const resultBuffer = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'recordId', operator: 'eq', value: query.recordId }]);
        expect(file.read).toHaveBeenCalledWith(mockRecord.recordFilepath);
        expect(resultBuffer).toBe(mockFileBuffer);
    });

    it('should throw RecordNotFoundError when record is not found', async () => {
        const query: ClientRecordFindOneFileQueryPayload = { recordId: 'record-id' };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(query)).rejects.toThrow(RecordNotFoundError);
    });

    it('should throw RecordNotFoundError when record is not completed', async () => {
        const query: ClientRecordFindOneFileQueryPayload = { recordId: 'record-id' };

        const mockRecord = { recordFilepath: 'path/to/result-file.pdf', status: RECORD_STATUS_STARTED } as unknown as ClientRecordModel;

        repository.findOneAsync.mockResolvedValue(mockRecord);

        await expect(handler.handleAsync(query)).rejects.toThrow(RecordNotFoundError);
    });
});
