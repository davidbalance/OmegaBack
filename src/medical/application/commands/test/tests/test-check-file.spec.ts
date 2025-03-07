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
