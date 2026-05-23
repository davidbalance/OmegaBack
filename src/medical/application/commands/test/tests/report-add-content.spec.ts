/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { ReportAddContentCommand, ReportAddContentCommandImpl, ReportAddContentCommandPayload } from "../report-add-content.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";

describe("ReportAddContentCommand", () => {
    let repository: jest.Mocked<TestRepository>;
    let handler: ReportAddContentCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        handler = new ReportAddContentCommandImpl(repository);
    });

    it("should add content to the report when test exists", async () => {
        const mockTest = {
            addReport: jest.fn(),
        } as unknown as Test;

        repository.findOneAsync.mockResolvedValue(mockTest);
        repository.saveAsync.mockResolvedValue();

        const payload: ReportAddContentCommandPayload = {
            testId: "test-id-123",
            content: "New report content",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(mockTest.addReport).toHaveBeenCalledWith(payload.content);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it("should throw TestNotFoundError when test does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: ReportAddContentCommandPayload = {
            testId: "test-id-123",
            content: "New report content",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
