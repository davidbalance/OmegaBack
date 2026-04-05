/* eslint-disable @typescript-eslint/unbound-method */
import { ZipProvider } from "@shared/shared/providers/zip.provider";
import { ResultGetFileQuery } from "../result-get-file.query";
import { TestFile, TestGetZipQuery, TestGetZipQueryImpl } from "../test-get-zip.query";

describe('TestGetZipQuery', () => {
    let zipper: jest.Mocked<ZipProvider>;
    let resultFileQuery: jest.Mocked<ResultGetFileQuery>;
    let queryHandler: TestGetZipQuery;

    beforeEach(() => {
        zipper = {
            zip: jest.fn(),
        } as unknown as jest.Mocked<ZipProvider>;

        resultFileQuery = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ResultGetFileQuery>;

        queryHandler = new TestGetZipQueryImpl(zipper, resultFileQuery);
    });

    it('should handle valid files and create a zip', async () => {
        const mockTestFiles: TestFile[] = [
            { testId: '1', examName: 'Blood Test', fileType: 'result' }
        ] as unknown as TestFile[];

        const mockResultBuffer = Buffer.from('result file content');

        resultFileQuery.handleAsync.mockResolvedValue(mockResultBuffer);
        zipper.zip.mockResolvedValue(Buffer.from('zip content'));

        const result = await queryHandler.handleAsync({ values: mockTestFiles });

        expect(resultFileQuery.handleAsync).toHaveBeenCalledWith({ testId: '1' });
        expect(zipper.zip).toHaveBeenCalledWith([
            { filename: 'result_blood_test.pdf', buffer: mockResultBuffer },
        ]);
        expect(result).toEqual(Buffer.from('zip content'));
    });
});
