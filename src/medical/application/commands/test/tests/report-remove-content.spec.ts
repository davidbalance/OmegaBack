/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { ReportRemoveContentCommand, ReportRemoveContentCommandPayload } from "../report-remove-content.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";

describe("ReportRemoveContentCommand", () => {
    let repository: jest.Mocked<TestRepository>;
    let handler: ReportRemoveContentCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        handler = new ReportRemoveContentCommand(repository);
    });

    it("should remove content from the report when test exists", async () => {
        const mockTest = {
            removeReport: jest.fn(),
        } as unknown as Test;

        repository.findOneAsync.mockResolvedValue(mockTest);
        repository.saveAsync.mockResolvedValue();

        const payload: ReportRemoveContentCommandPayload = {
            testId: "test-id-123",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(mockTest.removeReport).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it("should throw TestNotFoundError when test does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ReportRemoveContentCommandPayload = {
            testId: "test-id-123",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});