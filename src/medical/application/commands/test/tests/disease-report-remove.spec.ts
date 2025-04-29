/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { DiseaseReportRemoveCommand, DiseaseReportRemoveCommandImpl, DiseaseReportRemoveCommandPayload } from "../disease-report-remove.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";

describe("DiseaseReportRemoveCommand", () => {
    let repository: jest.Mocked<TestRepository>;
    let handler: DiseaseReportRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        handler = new DiseaseReportRemoveCommandImpl(repository);
    });

    it("should remove a disease report from the test when test exists", async () => {
        const mockTest = {
            removeDisease: jest.fn(),
        } as unknown as Test;

        repository.findOneAsync.mockResolvedValue(mockTest);
        repository.saveAsync.mockResolvedValue();

        const payload: DiseaseReportRemoveCommandPayload = {
            testId: "test-id-123",
            diseaseId: "disease-id-456",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(mockTest.removeDisease).toHaveBeenCalledWith(payload.diseaseId);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it("should throw TestNotFoundError when test does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: DiseaseReportRemoveCommandPayload = {
            testId: "test-id-123",
            diseaseId: "disease-id-456",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});