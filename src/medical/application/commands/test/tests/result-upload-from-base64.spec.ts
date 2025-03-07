/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";
import { FileOperation } from "@shared/shared/providers";
import { ResultUploadFromBase64Command, ResultUploadFromBase64CommandPayload } from "../result-upload-from-base64.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";

describe("ResultUploadFromBase64Command", () => {
    let file: jest.Mocked<FileOperation>;
    let repository: jest.Mocked<TestRepository>;
    let filepathRepository: jest.Mocked<ResultFilepathRepository>;
    let handler: ResultUploadFromBase64Command;

    beforeEach(() => {
        file = {
            write: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        filepathRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultFilepathRepository>;

        handler = new ResultUploadFromBase64Command(file, repository, filepathRepository);
    });

    it("should upload the result file when test and filepath exist", async () => {
        const mockTest = {
            addResult: jest.fn(),
        } as unknown as Test;

        const mockFilepath = { filepath: "path/to", filename: 'result.pdf' } as unknown as ResultFilepathModel;

        filepathRepository.findOneAsync.mockResolvedValue(mockFilepath);
        repository.findOneAsync.mockResolvedValue(mockTest);
        file.write.mockResolvedValue("");
        repository.saveAsync.mockResolvedValue();

        const base64String = "data:application/pdf;base64,aGVsbG8gd29ybGQ=";
        const payload: ResultUploadFromBase64CommandPayload = {
            testId: "test-id-123",
            base64: base64String,
        };

        await handler.handleAsync(payload);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([
            { field: "testId", operator: "eq", value: payload.testId },
        ]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(mockTest.addResult).toHaveBeenCalledWith(mockFilepath.filepath);
        expect(file.write).toHaveBeenCalledWith(mockFilepath.filepath, mockFilepath.filename, Buffer.from("aGVsbG8gd29ybGQ=", "base64"));
        expect(repository.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it("should throw TestNotFoundError when filepath is not found", async () => {
        filepathRepository.findOneAsync.mockResolvedValue(null);

        const payload: ResultUploadFromBase64CommandPayload = {
            testId: "test-id-123",
            base64: "data:application/pdf;base64,aGVsbG8gd29ybGQ=",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([
            { field: "testId", operator: "eq", value: payload.testId },
        ]);
        expect(repository.findOneAsync).not.toHaveBeenCalled();
        expect(file.write).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw TestNotFoundError when test is not found", async () => {
        const mockFilepath = { filepath: "path/to/result.pdf" } as unknown as ResultFilepathModel;
        filepathRepository.findOneAsync.mockResolvedValue(mockFilepath);
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ResultUploadFromBase64CommandPayload = {
            testId: "test-id-123",
            base64: "data:application/pdf;base64,aGVsbG8gd29ybGQ=",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([
            { field: "testId", operator: "eq", value: payload.testId },
        ]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(file.write).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
