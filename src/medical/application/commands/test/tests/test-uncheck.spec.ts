/* eslint-disable @typescript-eslint/unbound-method */
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { TestUncheckCommand, TestUncheckCommandPayload } from "../test-uncheck.command";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";

describe("TestUncheckCommand", () => {
    let repository: jest.Mocked<TestRepository>;
    let commandHandler: TestUncheckCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        commandHandler = new TestUncheckCommand(repository);
    });

    it("should successfully uncheck the test", async () => {
        const payload: TestUncheckCommandPayload = {
            testId: "test-1",
        };

        const mockedTest = { id: "test-1", uncheck: jest.fn() } as unknown as Test;

        repository.findOneAsync.mockResolvedValue(mockedTest);

        await commandHandler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.testId }],
        });
        expect(mockedTest.uncheck).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedTest);
    });

    it("should throw a TestNotFoundError if the test does not exist", async () => {
        const payload: TestUncheckCommandPayload = {
            testId: "non-existing-test",
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.testId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
