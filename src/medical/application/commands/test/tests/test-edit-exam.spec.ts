/* eslint-disable @typescript-eslint/unbound-method */
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { TestEditExamCommand, TestEditExamCommandImpl, TestEditExamCommandPayload } from "../test-edit-exam.command";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";

describe("TestEditExamCommand", () => {
    let repository: jest.Mocked<TestRepository>;
    let commandHandler: TestEditExamCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        commandHandler = new TestEditExamCommandImpl(repository);
    });

    it("should successfully update the exam of the test", async () => {
        const payload: TestEditExamCommandPayload = {
            testId: "test-1",
            examName: "new-exam-name",
            examType: "new-exam-type",
            examSubtype: "new-exam-subtype",
        };

        const mockedTest = { id: "test-1", changeExam: jest.fn(), save: jest.fn() } as unknown as Test;

        repository.findOneAsync.mockResolvedValue(mockedTest);

        await commandHandler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.testId }],
        });
        expect(mockedTest.changeExam).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedTest);
    });

    it("should throw a TestNotFoundError if the test does not exist", async () => {
        const payload: TestEditExamCommandPayload = {
            testId: "non-existing-test",
            examName: "new-exam-name",
            examType: "new-exam-type",
            examSubtype: "new-exam-subtype",
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(commandHandler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.testId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
