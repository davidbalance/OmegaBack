/* eslint-disable @typescript-eslint/unbound-method */
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { ClientRecordFindOneQuery, ClientRecordFindOneQueryImpl, ClientRecordFindOneQueryPayload } from "../client-record-find-one.query";
import { FileOperation } from "@shared/shared/providers";
import { RecordNotFoundError } from "@omega/medical/core/domain/client/errors/record.errors";

describe("ClientRecordFindOneQuery", () => {
    let repository: jest.Mocked<ClientRecordRepository>;
    let file: jest.Mocked<FileOperation>;
    let handler: ClientRecordFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRecordRepository>;

        file = {
            read: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        handler = new ClientRecordFindOneQueryImpl(repository, file);
    });

    it('should return file buffer when record exists', async () => {
        const query: ClientRecordFindOneQueryPayload = { recordId: 'record-id' };

        const mockRecord = { recordFilepath: 'path/to/result-file.pdf' } as unknown as ClientRecordModel;
        const mockFileBuffer = Buffer.from('file content');

        repository.findOneAsync.mockResolvedValue(mockRecord);
        file.read.mockResolvedValue(mockFileBuffer);

        const resultBuffer = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'recordId', operator: 'eq', value: query.recordId }]);
        expect(file.read).toHaveBeenCalledWith(mockRecord.recordFilepath);
        expect(resultBuffer).toBe(mockFileBuffer);
    });

    it('should throw RecordNotFoundError when filepath is not found', async () => {
        const query: ClientRecordFindOneQueryPayload = { recordId: 'record-id' };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(query)).rejects.toThrow(RecordNotFoundError);
    });
});
