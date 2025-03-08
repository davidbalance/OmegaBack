/* eslint-disable @typescript-eslint/unbound-method */
import { ResultGetFileQuery } from "@omega/medical/application/queries/test/result-get-file.query";
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { TestCheckFileCommand } from "../test-check-file.command";
import { TestFileResultModel } from "@omega/medical/core/model/test/test_file_result.model";

describe("TestCheckFileCommand", () => {
    let model: jest.Mocked<TestFileResultRepository>;
    let file: jest.Mocked<ResultGetFileQuery>;
    let commandHandler: TestCheckFileCommand;

    beforeEach(() => {
        model = {
            countAsync: jest.fn(),
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<TestFileResultRepository>;

        file = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultGetFileQuery>;

        commandHandler = new TestCheckFileCommand(model, file);
    });

    it("should process files in batches with pagination", async () => {
        const testData = Array.from({ length: 5000 }, (_, index) => ({
            testId: `test-${index + 1}`,
        } as unknown as TestFileResultModel));

        const totalCount = testData.length;
        const take = 1000;

        model.countAsync.mockResolvedValue(totalCount);
        model.findManyAsync.mockResolvedValue(testData.slice(0, take));

        file.handleAsync.mockResolvedValue(Buffer.from(''));

        await commandHandler.handleAsync();

        expect(model.countAsync).toHaveBeenCalledWith([{ field: 'resultHasFile', operator: 'eq', value: true }]);
        expect(model.findManyAsync).toHaveBeenCalledTimes(Math.ceil(totalCount / take));
        expect(file.handleAsync).toHaveBeenCalledTimes(totalCount);
    });

    it("should handle errors gracefully and continue processing", async () => {
        const testData = Array.from({ length: 2 }, (_, index) => ({
            testId: `test-${index + 1}`,
        } as unknown as TestFileResultModel));

        const totalCount = testData.length;
        const take = 2;

        model.countAsync.mockResolvedValue(totalCount);
        model.findManyAsync.mockResolvedValue(testData.slice(0, take));

        file.handleAsync.mockImplementationOnce((data) => {
            if (data.testId === "test-1") {
                throw new Error("File handling error for test-1");
            }
            return Promise.resolve(Buffer.from(''));
        });

        await commandHandler.handleAsync();

        expect(file.handleAsync).toHaveBeenCalledTimes(2);
    });
});


/* 
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { TestCheckFileCommand } from "../test-check-file.command";
import { TestFileResultModel } from "@omega/medical/core/model/test/test_file_result.model";
import { ResultFileRemoveBatchEvent } from "@omega/medical/core/domain/test/events/result.events";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { FileOperation } from "@shared/shared/providers";

describe("TestCheckFileCommand", () => {
    let model: jest.Mocked<TestFileResultRepository>;
    let repository: jest.Mocked<TestRepository>;
    let file: jest.Mocked<FileOperation>;
    let commandHandler: TestCheckFileCommand;

    beforeEach(() => {
        model = {
            countAsync: jest.fn(),
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<TestFileResultRepository>;

        repository = {
            batchAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        file = {
            read: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        commandHandler = new TestCheckFileCommand(model, repository, file);
    });

    it("should process files in batches with pagination", async () => {
        const testData = Array.from({ length: 5000 }, (_, index) => ({
            testId: `test-${index + 1}`,
            resultFilepath: `path-${index + 1}`
        } as unknown as TestFileResultModel));

        const totalCount = testData.length;
        const take = 100;

        model.countAsync.mockResolvedValue(totalCount);
        model.findManyAsync.mockResolvedValue(testData.slice(0, take));
        file.read.mockResolvedValue(Buffer.from(''));

        await commandHandler.handleAsync();

        expect(model.countAsync).toHaveBeenCalledWith([{ field: 'resultHasFile', operator: 'eq', value: true }]);
        expect(model.findManyAsync).toHaveBeenCalledTimes(Math.ceil(totalCount / take));
        expect(file.read).toHaveBeenCalledTimes(totalCount);
        expect(repository.batchAsync).toHaveBeenCalledTimes(Math.ceil(totalCount / take));
        expect(repository.batchAsync).toHaveBeenCalledWith(new ResultFileRemoveBatchEvent([]));
    });

    it("should process files in batches with pagination if read fails", async () => {
        const testData = Array.from({ length: 5000 }, (_, index) => ({
            testId: `test-${index + 1}`,
            resultFilepath: `path-${index + 1}`
        } as unknown as TestFileResultModel));

        const totalCount = testData.length;
        const take = 100;

        model.countAsync.mockResolvedValue(totalCount);
        model.findManyAsync.mockResolvedValue(testData.slice(0, take));
        file.read.mockRejectedValue(new Error('Do not get any file.'));

        await commandHandler.handleAsync();

        expect(model.countAsync).toHaveBeenCalledWith([{ field: 'resultHasFile', operator: 'eq', value: true }]);
        expect(model.findManyAsync).toHaveBeenCalledTimes(Math.ceil(totalCount / take));
        expect(file.read).toHaveBeenCalledTimes(totalCount);
        expect(repository.batchAsync).toHaveBeenCalledTimes(Math.ceil(totalCount / take));
        expect(repository.batchAsync).toHaveBeenCalledWith(new ResultFileRemoveBatchEvent(testData.slice(0, take).map(e => e.testId)));
    });

    it("should handle errors gracefully and continue processing", async () => {
        const testData = Array.from({ length: 2 }, (_, index) => ({
            testId: `test-${index + 1}`,
            resultFilepath: `path-${index + 1}`
        } as unknown as TestFileResultModel));

        const totalCount = testData.length;
        const take = 2;

        model.countAsync.mockResolvedValue(totalCount);
        model.findManyAsync.mockResolvedValue(testData.slice(0, take));

        file.read.mockImplementationOnce((filepath: string) => {
            if (filepath === "path-1") {
                throw new Error("File read error for path-1");
            }
            return Promise.resolve(Buffer.from(''));
        });

        await commandHandler.handleAsync();

        expect(file.read).toHaveBeenCalledTimes(2); // Ensures it tries to read both files
        expect(repository.batchAsync).toHaveBeenCalledTimes(1); // Only one batch should be processed
    });
});
*/