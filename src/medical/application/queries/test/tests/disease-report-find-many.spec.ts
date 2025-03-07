/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseReportModel } from "@omega/medical/core/model/test/disease-report.model";
import { ModelRepository } from "@shared/shared/providers";
import { DiseaseReportFindManyQuery, DiseaseReportFindManyQueryPayload } from "../disease-report-find-many.query";

describe("DiseaseReportFindManyQuery", () => {
    let repository: jest.Mocked<ModelRepository<DiseaseReportModel>>;
    let handler: DiseaseReportFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<DiseaseReportModel>>;

        handler = new DiseaseReportFindManyQuery(repository);
    });

    it("should return a list of disease report models when testId is provided", async () => {
        const mockReports = [
            { reportId: "report123", testId: "test1", disease: "Disease A" },
            { reportId: "report124", testId: "test1", disease: "Disease B" },
        ] as unknown as DiseaseReportModel[];

        const query: DiseaseReportFindManyQueryPayload = {
            testId: "test1",
        };

        repository.findManyAsync.mockResolvedValue(mockReports);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: 'testId', operator: 'eq', value: query.testId }],
        });
        expect(result).toEqual(mockReports);
    });

    it("should return an empty list when no disease report models are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const query: DiseaseReportFindManyQueryPayload = {
            testId: "nonexistentTestId",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: 'testId', operator: 'eq', value: query.testId }],
        });
        expect(result).toEqual([]);
    });
});
