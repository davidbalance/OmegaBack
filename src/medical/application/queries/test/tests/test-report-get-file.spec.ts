/* eslint-disable @typescript-eslint/unbound-method */
import { TestReportModel } from "@omega/medical/core/model/test/test-report.model";
import { ModelRepository, SpreadsheetCell, SpreadsheetProvider } from "@shared/shared/providers";
import { TestReportGetFileQuery, TestReportGetFileQueryPayload, testReportSpreadsheet } from "../test-report-get-file.query";

describe("TestReportGetFileQuery", () => {
    let repository: jest.Mocked<ModelRepository<TestReportModel>>;
    let spreadsheet: jest.Mocked<SpreadsheetProvider>;
    let handler: TestReportGetFileQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<TestReportModel>>;

        spreadsheet = {
            craft: jest.fn(),
        } as unknown as jest.Mocked<SpreadsheetProvider>;

        handler = new TestReportGetFileQuery(repository, spreadsheet);
    });

    it("should return a buffer with the correct data when valid query is provided", async () => {
        const query: TestReportGetFileQueryPayload = {
            locationCorporative: "CorpX",
            locationCompany: "CompX",
        };

        const mockData = [
            { locationCompany: "Company1", locationBranch: "Branch1", orderYear: 2025, patientName: "John Doe" },
            { locationCompany: "Company2", locationBranch: "Branch2", orderYear: 2025, patientName: "Jane Doe" },
        ] as unknown as TestReportModel[];

        const mockBuffer = Buffer.from("mock-excel-buffer");

        repository.findManyAsync.mockResolvedValue(mockData);
        spreadsheet.craft.mockResolvedValue(mockBuffer);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [
                { field: "locationCorporative", operator: "eq", value: query.locationCorporative },
                { field: "locationCompany", operator: "eq", value: query.locationCompany },
            ],
        });
        expect(spreadsheet.craft).toHaveBeenCalled();
        expect(result).toEqual(mockBuffer);
    });

    it("should apply the year filter if it's provided in the query", async () => {
        const query: TestReportGetFileQueryPayload = {
            locationCorporative: "CorpX",
            locationCompany: "CompX",
            orderYear: 2025,
        };

        const mockData = [
            { locationCompany: "Company1", locationBranch: "Branch1", orderYear: 2025, patientName: "John Doe" },
        ] as unknown as TestReportModel[];

        const mockBuffer = Buffer.from("mock-excel-buffer");

        repository.findManyAsync.mockResolvedValue(mockData);
        spreadsheet.craft.mockResolvedValue(mockBuffer);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [
                { field: "locationCorporative", operator: "eq", value: query.locationCorporative },
                { field: "locationCompany", operator: "eq", value: query.locationCompany },
                { field: "orderYear", operator: "eq", value: query.orderYear },
            ],
        });
        expect(result).toEqual(mockBuffer);
    });
});
