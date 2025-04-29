import { Injectable, Provider } from "@nestjs/common";
import { InjectQuery, TestGetZipQueryToken } from "../../inject/query.inject";
import { TestGetZipQueryImpl } from "@omega/medical/application/queries/test/test-get-zip.query";
import { InjectZipper } from "@shared/shared/nest/inject";
import { ZipProvider } from "@shared/shared/providers/zip.provider";
import { ResultGetFileQuery } from "@omega/medical/application/queries/test/result-get-file.query";
import { ReportGetFileQuery } from "@omega/medical/application/queries/test/report-get-file.query";

@Injectable()
class TestGetZipNestQuery extends TestGetZipQueryImpl {
    constructor(
        @InjectZipper() zipper: ZipProvider,
        @InjectQuery("ResultGetFile") resultFileQuery: ResultGetFileQuery,
        @InjectQuery("ReportGetFile") reportFileQuery: ReportGetFileQuery
    ) {
        super(zipper, resultFileQuery, reportFileQuery);
    }
}

export const TestGetZipQueryProvider: Provider = {
    provide: TestGetZipQueryToken,
    useClass: TestGetZipNestQuery
}