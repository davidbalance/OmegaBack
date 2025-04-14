import { QueryHandlerAsync } from "@shared/shared/application";
import { ResultGetFileQuery } from "./result-get-file.query";
import { ReportGetFileQuery } from "./report-get-file.query";
import { TestInvalidError } from "@omega/medical/core/domain/test/errors/test.errors";
import { ZipPayload, ZipProvider } from "@shared/shared/providers/zip.provider";

export type TestFile = {
    testId: string;
    examName: string;
    fileType: 'report' | 'result';
}
export type TestGetZipQueryPayload = {
    values: TestFile[]
}
export class TestGetZipQuery implements QueryHandlerAsync<TestGetZipQueryPayload, Buffer> {
    constructor(
        private readonly zipper: ZipProvider,
        private readonly resultFileQuery: ResultGetFileQuery,
        private readonly reportFileQuery: ReportGetFileQuery
    ) { }

    async handleAsync(query: TestGetZipQueryPayload): Promise<Buffer> {
        if (!query.values.length) throw new TestInvalidError("empty files");
        const values: ZipPayload[] = [];
        for (const value of query.values) {
            const buffer: Buffer | null = (value.fileType === 'result')
                ? await this.resultFileQuery.handleAsync({ testId: value.testId })
                : await this.reportFileQuery.handleAsync({ testId: value.testId });
            values.push({
                filename: `${value.fileType}_${value.examName.toLowerCase().replaceAll(' ', '_')}.pdf`,
                buffer: buffer
            });
        }
        const zip = await this.zipper.zip(values);
        return zip;
    }
}