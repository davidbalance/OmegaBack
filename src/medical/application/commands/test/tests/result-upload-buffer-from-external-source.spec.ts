import { ResultUploadBufferCommand } from "@omega/medical/application/commands/test/result-upload-buffer.command";
import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { ResultUploadBufferFromExternalSourceCommand, ResultUploadBufferFromExternalSourceCommandImpl, ResultUploadBufferFromExternalSourceCommandPayload } from "../result-upload-buffer-from-external-source.command";

describe("ResultUploadBufferFromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<TestExternalConnectionRepository>;
    let findOneQuery: jest.Mocked<ResultUploadBufferCommand>;
    let handler: ResultUploadBufferFromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestExternalConnectionRepository>;

        findOneQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultUploadBufferCommand>;

        handler = new ResultUploadBufferFromExternalSourceCommandImpl(externalConnectionRepository, findOneQuery);
    });

    it("should call uploadCommand.handleAsync with correct testId and buffer if external connection is found", async () => {
        const mockExternalConnection = { testId: "result123" } as unknown as TestExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        const query: ResultUploadBufferFromExternalSourceCommandPayload = {
            owner: "result-owner",
            value: "result-id",
            buffer: Buffer.from('sample-123')
        };

        await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: query.value },
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
        ]);
        expect(findOneQuery.handleAsync).toHaveBeenCalledWith({
            testId: mockExternalConnection.testId,
            buffer: query.buffer
        });
    });

    it("should throw TestExternalKeyNotFoundError if external connection is not found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);

        const query: ResultUploadBufferFromExternalSourceCommandPayload = {
            owner: "result-owner",
            value: "result-id",
            buffer: Buffer.from('sample-123')
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(TestExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: query.value },
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
        ]);
        expect(findOneQuery.handleAsync).not.toHaveBeenCalled();
    });
});
