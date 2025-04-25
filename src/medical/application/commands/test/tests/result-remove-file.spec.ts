/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";
import { FileOperation } from "@shared/shared/providers";
import { ResultRemoveFileCommand, ResultRemoveFileCommandImpl, ResultRemoveFileCommandPayload } from "../result-remove-file.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";

describe("ResultRemoveFileCommand", () => {
    let file: jest.Mocked<FileOperation>;
    let repository: jest.Mocked<TestRepository>;
    let filepathRepository: jest.Mocked<ResultFilepathRepository>;
    let handler: ResultRemoveFileCommand;

    beforeEach(() => {
        file = {
            remove: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        filepathRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultFilepathRepository>;

        handler = new ResultRemoveFileCommandImpl(file, repository, filepathRepository);
    });

    it("should remove the result file when test and filepath exist", async () => {
        const mockTest = {
            result: { filepath: "path/to/result.pdf" },
            removeResult: jest.fn(),
        } as unknown as Test;

        const mockFilepath = { testId: "test-id-123" } as unknown as ResultFilepathModel;

        filepathRepository.findOneAsync.mockResolvedValue(mockFilepath);
        repository.findOneAsync.mockResolvedValue(mockTest);
        file.remove.mockResolvedValue();
        repository.saveAsync.mockResolvedValue();

        const payload: ResultRemoveFileCommandPayload = {
            testId: "test-id-123",
        };

        await handler.handleAsync(payload);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([
            { field: "testId", operator: "eq", value: payload.testId },
        ]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(file.remove).toHaveBeenCalledWith(mockTest.result.filepath);
        expect(mockTest.removeResult).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it("should not remove the result file when test filepath not exists but the filepath exist", async () => {
        const mockTest = {
            result: { filepath: null },
            removeResult: jest.fn(),
        } as unknown as Test;

        const mockFilepath = { testId: "test-id-123" } as unknown as ResultFilepathModel;

        filepathRepository.findOneAsync.mockResolvedValue(mockFilepath);
        repository.findOneAsync.mockResolvedValue(mockTest);
        file.remove.mockResolvedValue();
        repository.saveAsync.mockResolvedValue();

        const payload: ResultRemoveFileCommandPayload = {
            testId: "test-id-123",
        };

        await handler.handleAsync(payload);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([
            { field: "testId", operator: "eq", value: payload.testId },
        ]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(file.remove).not.toHaveBeenCalled();
        expect(mockTest.removeResult).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw TestNotFoundError when filepath is not found", async () => {
        filepathRepository.findOneAsync.mockResolvedValue(null);

        const payload: ResultRemoveFileCommandPayload = {
            testId: "test-id-123",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([
            { field: "testId", operator: "eq", value: payload.testId },
        ]);
        expect(repository.findOneAsync).not.toHaveBeenCalled();
        expect(file.remove).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw TestNotFoundError when test is not found", async () => {
        const mockFilepath = { testId: "test-id-123" } as unknown as ResultFilepathModel;
        filepathRepository.findOneAsync.mockResolvedValue(mockFilepath);
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ResultRemoveFileCommandPayload = {
            testId: "test-id-123",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([
            { field: "testId", operator: "eq", value: payload.testId },
        ]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(file.remove).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
