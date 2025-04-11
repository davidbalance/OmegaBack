import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { ResultUploadBase64FromExternalSourceCommand, ResultUploadBase64FromExternalSourceCommandPayload } from "../result-upload-base64-from-external-source.command";
import { ResultUploadBase64Command } from "../result-upload-base64.command";

describe("ResultUploadBase64FromExternalSourceCommand", () => {
    let externalConnectionRepository: jest.Mocked<TestExternalConnectionRepository>;
    let findOneQuery: jest.Mocked<ResultUploadBase64Command>;
    let handler: ResultUploadBase64FromExternalSourceCommand;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestExternalConnectionRepository>;

        findOneQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultUploadBase64Command>;

        handler = new ResultUploadBase64FromExternalSourceCommand(externalConnectionRepository, findOneQuery);
    });

    it("should call uploadCommand.handleAsync with correct testId and buffer if external connection is found", async () => {
        const mockExternalConnection = { testId: "result123" } as unknown as TestExternalConnectionModel;
        const base64: string = 'testing-base64';

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);

        const query: ResultUploadBase64FromExternalSourceCommandPayload = {
            owner: "result-owner",
            value: "result-id",
            base64: base64
        };

        await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: query.value },
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
        ]);
        expect(findOneQuery.handleAsync).toHaveBeenCalledWith({
            testId: mockExternalConnection.testId,
            base64: base64
        });
    });

    it("should throw TestExternalKeyNotFoundError if external connection is not found", async () => {
        const base64: string = 'testing-base64';
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);

        const query: ResultUploadBase64FromExternalSourceCommandPayload = {
            owner: "result-owner",
            value: "result-id",
            base64: base64
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(TestExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: query.value },
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
        ]);
        expect(findOneQuery.handleAsync).not.toHaveBeenCalled();
    });
});
