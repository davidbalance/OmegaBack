import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { ResultGetFileFromExternalSourceQuery, ResultGetFileFromExternalSourceQueryImpl, ResultGetFileFromExternalSourceQueryPayload } from "../result-get-file-from-external-source.query";
import { ResultGetFileQuery } from "../result-get-file.query";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";

describe("ResultGetFileFromExternalSourceQuery", () => {
    let externalConnectionRepository: jest.Mocked<TestExternalConnectionRepository>;
    let getFileQuery: jest.Mocked<ResultGetFileQuery>;
    let handler: ResultGetFileFromExternalSourceQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestExternalConnectionRepository>;

        getFileQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultGetFileQuery>;

        handler = new ResultGetFileFromExternalSourceQueryImpl(externalConnectionRepository, getFileQuery);
    });

    it("should return the buffer from getFileQuery.handleAsync when external connection is found", async () => {
        const mockExternalConnection: TestExternalConnectionModel = { testId: "test123" } as unknown as TestExternalConnectionModel;
        const mockResult = Buffer.from('Test file');

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        getFileQuery.handleAsync.mockResolvedValue(mockResult);

        const query: ResultGetFileFromExternalSourceQueryPayload = {
            owner: "test-owner",
            value: "test-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
            { field: 'testExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(getFileQuery.handleAsync).toHaveBeenCalledWith({ testId: mockExternalConnection.testId });
        expect(result).toEqual(mockResult);
    });

    it("should throw TestExternalKeyNotFoundError if external connection is not found", async () => {
        const mockResult = Buffer.from('Test file');

        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        getFileQuery.handleAsync.mockResolvedValue(mockResult);

        const query: ResultGetFileFromExternalSourceQueryPayload = {
            owner: "test-owner",
            value: "test-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(TestExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
            { field: 'testExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(getFileQuery.handleAsync).not.toHaveBeenCalled();
    });
});