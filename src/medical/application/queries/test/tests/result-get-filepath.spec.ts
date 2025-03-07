/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";
import { ModelRepository } from "@shared/shared/providers";
import { ResultGetFilepathQuery, ResultGetFilepathQueryPayload } from "../result-get-filepath.query";

describe("ResultGetFilepathQuery", () => {
    let repository: jest.Mocked<ModelRepository<ResultFilepathModel>>;
    let handler: ResultGetFilepathQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<ResultFilepathModel>>;

        handler = new ResultGetFilepathQuery(repository);
    });

    it("should return the filepath when testId is valid", async () => {
        const mockFilepath = {
            testId: "test123",
            filepath: "path/to/file",
        } as ResultFilepathModel;

        const query: ResultGetFilepathQueryPayload = {
            testId: "test123",
        };

        repository.findOneAsync.mockResolvedValue(mockFilepath);

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testId', operator: 'eq', value: query.testId },
        ]);
        expect(result).toBe(mockFilepath.filepath);
    });

    it("should throw TestNotFoundError when testId is not found", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: ResultGetFilepathQueryPayload = {
            testId: "nonexistentTestId",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(TestNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: 'testId', operator: 'eq', value: query.testId },
        ]);
    });
});
