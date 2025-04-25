/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { DiseaseReportCreateCommand, DiseaseReportCreateCommandImpl, DiseaseReportCreateCommandPayload } from "../disease-report-create.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";

describe("DiseaseReportCreateCommand", () => {
    let repository: jest.Mocked<TestRepository>;
    let handler: DiseaseReportCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        handler = new DiseaseReportCreateCommandImpl(repository);
    });

    it("should add a disease report to the test when test exists", async () => {
        const mockTest = {
            addDisease: jest.fn(),
        } as unknown as Test;

        repository.findOneAsync.mockResolvedValue(mockTest);
        repository.saveAsync.mockResolvedValue();

        const payload: DiseaseReportCreateCommandPayload = {
            testId: "test-id-123",
            diseaseId: "disease-1",
            diseaseName: "Disease A",
            diseaseGroupId: "disease-group-1",
            diseaseGroupName: "Disease Group A",
            commentary: "Commentary of disease A",
        };

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(mockTest.addDisease).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it("should throw TestNotFoundError when test does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: DiseaseReportCreateCommandPayload = {
            testId: "test-id-123",
            diseaseId: "disease-1",
            diseaseName: "Disease A",
            diseaseGroupId: "disease-group-1",
            diseaseGroupName: "Disease Group A",
            commentary: "Commentary of disease A",
        };

        await expect(handler.handleAsync(payload)).rejects.toThrow(TestNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.testId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});