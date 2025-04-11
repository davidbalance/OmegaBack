import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";
import { FileOperation } from "@shared/shared/providers";
import { ResultUploadBase64Command, ResultUploadBase64CommandPayload } from "../result-upload-base64.command";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";

describe("ResultUploadBase64Command", () => {
    let file: jest.Mocked<FileOperation>;
    let repository: jest.Mocked<TestRepository>;
    let filepathRepository: jest.Mocked<ResultFilepathRepository>;
    let handler: ResultUploadBase64Command;

    const base64File: string = 'my-base-64-file';

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

        handler = new ResultUploadBase64Command(file, repository, filepathRepository);
    });

    it("should upload the result file when test and filepath exist", async () => {
        const mockTest = {
            addResult: jest.fn(),
        } as unknown as Test;

        const mockFilepath = {
            filepath: "path/to",
            filename: 'result.pdf',
            path: 'path/to/result.pdf'
        } as unknown as ResultFilepathModel;

        filepathRepository.findOneAsync.mockResolvedValue(mockFilepath);
        repository.findOneAsync.mockResolvedValue(mockTest);
        file.write.mockResolvedValue("path/to/result.pdf");
        repository.saveAsync.mockResolvedValue();

        const buffer = Buffer.from(base64File, 'base64');
        const payload: ResultUploadBase64CommandPayload = {
            testId: "test-id-123",
            base64: base64File
        };

        await handler.handleAsync(payload);

        expect(filepathRepository.findOneAsync).toHaveBeenCalledWith([
            { field: "testId", operator: "eq", value: payload.testId },
        ]);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(file.write).toHaveBeenCalledWith(mockFilepath.filepath, mockFilepath.filename, buffer);
        expect(mockTest.addResult).toHaveBeenCalledWith("path/to/result.pdf");
        expect(repository.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it("should throw TestNotFoundError when filepath is not found", async () => {
        filepathRepository.findOneAsync.mockResolvedValue(null);

        const payload: ResultUploadBase64CommandPayload = {
            testId: "test-id-123",
            base64: base64File
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

        const payload: ResultUploadBase64CommandPayload = {
            testId: "test-id-123",
            base64: base64File
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
