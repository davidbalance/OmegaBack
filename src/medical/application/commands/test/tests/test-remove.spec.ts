/* eslint-disable @typescript-eslint/unbound-method */
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRemoveCommand } from "../test-remove.command";

describe("TestRemoveCommand", () => {
    let repository: jest.Mocked<TestRepository>;
    let commandHandler: TestRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        commandHandler = new TestRemoveCommand(repository);
    });

    it("should successfully remove and save the test", async () => {
        const testId = "test-1";
        const test = { id: testId, remove: jest.fn() } as unknown as Test;

        repository.findOneAsync.mockResolvedValue(test);

        await commandHandler.handleAsync({ testId });

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: testId }]
        });
        expect(test.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(test);
    });

    it("should throw an error if the test is not found", async () => {
        const testId = "test-1";

        repository.findOneAsync.mockResolvedValue(null);

        await expect(commandHandler.handleAsync({ testId })).rejects.toThrow(TestNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: testId }]
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
