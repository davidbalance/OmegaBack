import { Injectable, Provider } from "@nestjs/common";
import { TestReportGetFileQuery } from "@omega/medical/application/queries/test/test-report-get-file.query";
import { TestReportRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestReportGetFileQueryToken } from "../../inject/query.inject";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { TestReportModel } from "@omega/medical/core/model/test/test-report.model";

@Injectable()
class TestReportGetFileNestQuery extends TestReportGetFileQuery {
    constructor(
        @InjectModelRepository("TestReport") repository: TestReportRepository,
        @InjectSpreadSheet() spreadsheet: SpreadsheetProvider<TestReportModel>
    ) {
        super(repository, spreadsheet);
    }
}

export const TestReportGetFileQueryProvider: Provider = {
    provide: TestReportGetFileQueryToken,
    useClass: TestReportGetFileNestQuery
}