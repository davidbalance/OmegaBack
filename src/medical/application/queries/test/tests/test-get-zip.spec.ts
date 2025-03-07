/* eslint-disable @typescript-eslint/unbound-method */
import { ZipProvider } from "@shared/shared/providers/zip.provider";
import { ResultGetFileQuery } from "../result-get-file.query";
import { ReportGetFileQuery } from "../report-get-file.query";
import { TestFile, TestGetZipQuery } from "../test-get-zip.query";

describe('TestGetZipQuery', () => {
    let zipper: jest.Mocked<ZipProvider>;
    let resultFileQuery: jest.Mocked<ResultGetFileQuery>;
    let reportFileQuery: jest.Mocked<ReportGetFileQuery>;
    let queryHandler: TestGetZipQuery;

    beforeEach(() => {
        zipper = {
            zip: jest.fn(),
        } as unknown as jest.Mocked<ZipProvider>;

        resultFileQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultGetFileQuery>;

        reportFileQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ReportGetFileQuery>;

        queryHandler = new TestGetZipQuery(zipper, resultFileQuery, reportFileQuery);
    });

    it('should handle valid files and create a zip', async () => {
        const mockTestFiles: TestFile[] = [
            { testId: '1', examName: 'Blood Test', fileType: 'result' },
            { testId: '2', examName: 'X-Ray', fileType: 'report' }
        ] as unknown as TestFile[];

        const mockResultBuffer = Buffer.from('result file content');
        const mockReportBuffer = Buffer.from('report file content');

        resultFileQuery.handleAsync.mockResolvedValue(mockResultBuffer);
        reportFileQuery.handleAsync.mockResolvedValue(mockReportBuffer);
        zipper.zip.mockResolvedValue(Buffer.from('zip content'));

        const result = await queryHandler.handleAsync({ values: mockTestFiles });

        expect(resultFileQuery.handleAsync).toHaveBeenCalledWith({ testId: '1' });
        expect(reportFileQuery.handleAsync).toHaveBeenCalledWith({ testId: '2' });
        expect(zipper.zip).toHaveBeenCalledWith([
            { filename: 'result_blood_test.pdf', buffer: mockResultBuffer },
            { filename: 'report_x-ray.pdf', buffer: mockReportBuffer }
        ]);
        expect(result).toEqual(Buffer.from('zip content'));
    });
});
