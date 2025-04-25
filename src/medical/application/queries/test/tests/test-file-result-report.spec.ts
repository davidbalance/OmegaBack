/* eslint-disable @typescript-eslint/unbound-method */
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFileResultModel } from "@omega/medical/core/model/test/test_file_result.model";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { reportSpreadsheet, TestFileResultReportQuery, TestFileResultReportQueryImpl } from "../test-file-result-report.query";

describe('TestFileResultReportQuery', () => {
    let repository: jest.Mocked<TestFileResultRepository>;
    let spreadsheet: jest.Mocked<SpreadsheetProvider>;
    let queryHandler: TestFileResultReportQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<TestFileResultRepository>;

        spreadsheet = {
            craft: jest.fn(),
        } as unknown as jest.Mocked<SpreadsheetProvider>;

        queryHandler = new TestFileResultReportQueryImpl(repository, spreadsheet);
    });

    it('should generate the report with correct data', async () => {
        const mockData: TestFileResultModel[] = [
            {
                testId: '1',
                patientName: 'John',
                patientLastname: 'Doe',
                patientDni: '12345678',
                examName: 'Blood Test',
                resultFilepath: '',
                resultHasFile: false,
            },
            {
                testId: '2',
                patientName: 'Jane',
                patientLastname: 'Smith',
                patientDni: '87654321',
                examName: 'X-Ray',
                resultFilepath: '',
                resultHasFile: false,
            },
        ] as unknown as TestFileResultModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        const mockBuffer = Buffer.from('spreadsheet data');
        spreadsheet.craft.mockResolvedValue(mockBuffer);

        const result = await queryHandler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [{ field: 'resultHasFile', operator: 'eq', value: false }] });
        expect(spreadsheet.craft).toHaveBeenCalled();
        expect(result).toBe(mockBuffer);
    });
});
