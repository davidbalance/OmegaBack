/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseReportModel } from "@omega/medical/core/model/test/disease-report.model";
import { ModelRepository } from "@shared/shared/providers";
import { DiseaseReportFindOneQuery, DiseaseReportFindOneQueryPayload } from "../disease-report-find-one.query";
import { DiseaseReportNotFoundError } from "@omega/medical/core/domain/test/errors/disease-report.errors";

describe("DiseaseReportFindOneQuery", () => {
    let repository: jest.Mocked<ModelRepository<DiseaseReportModel>>;
    let handler: DiseaseReportFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<DiseaseReportModel>>;

        handler = new DiseaseReportFindOneQuery(repository);
    });

    it("should return a disease report when diseaseReportId is valid", async () => {
        const mockReport = { reportId: "report123", id: "diseaseReport123", disease: "Disease A" } as unknown as DiseaseReportModel;

        const query: DiseaseReportFindOneQueryPayload = {
            diseaseReportId: "diseaseReport123",
        };

        repository.findOneAsync.mockResolvedValue(mockReport);

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: 'diseaseReportId', operator: 'eq', value: query.diseaseReportId },
        ]);
        expect(result).toEqual(mockReport);
    });

    it("should throw TestDiseaseReportNotFoundError when diseaseReportId is not found", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: DiseaseReportFindOneQueryPayload = {
            diseaseReportId: "nonexistentReportId",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(DiseaseReportNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: 'diseaseReportId', operator: 'eq', value: query.diseaseReportId },
        ]);
    });
});
