/* eslint-disable @typescript-eslint/unbound-method */
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { Test } from "@omega/medical/core/domain/test/test.domain";
import { DiseaseReportEditCommand, DiseaseReportEditCommandImpl, DiseaseReportEditCommandPayload } from "../disease-report-edit.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";

describe("DiseaseReportEditCommand", () => {
    let repository: jest.Mocked<TestRepository>;
    let handler: DiseaseReportEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        handler = new DiseaseReportEditCommandImpl(repository);
    });

    it("should update a disease report for the test when test exists", async () => {
        const mockTest = {
            updateDisease: jest.fn(),
        } as unknown as Test;

        repository.findOneAsync.mockResolvedValue(mockTest);
        repository.saveAsync.mockResolvedValue();

        const payload: DiseaseReportEditCommandPayload = {
            diseaseReportId: "disease-id-123",
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
        expect(mockTest.updateDisease).toHaveBeenCalledWith({ ...payload, id: payload.diseaseReportId });
        expect(repository.saveAsync).toHaveBeenCalledWith(mockTest);
    });

    it("should throw TestNotFoundError when test does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: DiseaseReportEditCommandPayload = {
            diseaseReportId: "disease-id-123",
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