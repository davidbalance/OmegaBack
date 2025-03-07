/* eslint-disable @typescript-eslint/unbound-method */
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";
import { FileOperation } from "@shared/shared/providers";
import { ResultGetFileQuery, ResultGetFileQueryPayload } from "../result-get-file.query";
import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";

describe('ResultGetFileQuery', () => {
    let file: jest.Mocked<FileOperation>;
    let repository: jest.Mocked<ResultFilepathRepository>;
    let result: jest.Mocked<TestRepository>;
    let queryHandler: ResultGetFileQuery;

    beforeEach(() => {
        file = {
            read: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultFilepathRepository>;

        result = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        queryHandler = new ResultGetFileQuery(file, repository, result);
    });

    it('should return file buffer when filepath exists and file is readable', async () => {
        const queryPayload: ResultGetFileQueryPayload = { testId: 'test-id' };

        const mockFilepath = { path: 'path/to/result-file.pdf' } as unknown as ResultFilepathModel;
        const mockFileBuffer = Buffer.from('file content');

        repository.findOneAsync.mockResolvedValue(mockFilepath);
        file.read.mockResolvedValue(mockFileBuffer);

        const resultBuffer = await queryHandler.handleAsync(queryPayload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'testId', operator: 'eq', value: queryPayload.testId }]);
        expect(file.read).toHaveBeenCalledWith(mockFilepath.path);
        expect(resultBuffer).toBe(mockFileBuffer);
    });

    it('should throw TestNotFoundError when filepath is not found', async () => {
        const queryPayload: ResultGetFileQueryPayload = { testId: 'test-id' };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(queryHandler.handleAsync(queryPayload)).rejects.toThrow(TestNotFoundError);
    });

    it('should remove result from aggregate repository when file read fails and no filepath is available', async () => {
        const queryPayload: ResultGetFileQueryPayload = { testId: 'test-id' };

        const mockFilepath = { path: 'path/to/result-file.pdf' } as unknown as ResultFilepathModel;

        repository.findOneAsync.mockResolvedValue(mockFilepath);
        file.read.mockRejectedValue(new Error('File read error'));

        const mockTest = {
            id: 'test-id',
            removeResult: jest.fn(),
        } as unknown as Test;

        result.findOneAsync.mockResolvedValue(mockTest);

        await expect(queryHandler.handleAsync(queryPayload)).rejects.toThrow('File read error');
        expect(result.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: queryPayload.testId }] });
        expect(mockTest.removeResult).toHaveBeenCalled();
        expect(result.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it('should throw TestNotFoundError when no test is found in aggregate repository after file read fails', async () => {
        const queryPayload: ResultGetFileQueryPayload = { testId: 'test-id' };

        const mockFilepath = { path: 'path/to/result-file.pdf' } as unknown as ResultFilepathModel;

        repository.findOneAsync.mockResolvedValue(mockFilepath);
        file.read.mockRejectedValue(new Error('File read error'));

        result.findOneAsync.mockResolvedValue(null);

        await expect(queryHandler.handleAsync(queryPayload)).rejects.toThrow(TestNotFoundError);
        expect(result.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: queryPayload.testId }] });
    });
});