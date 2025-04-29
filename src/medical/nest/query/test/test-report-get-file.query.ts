import { Injectable, Provider } from "@nestjs/common";
import { TestReportGetFileQueryImpl } from "@omega/medical/application/queries/test/test-report-get-file.query";
import { TestReportRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestReportGetFileQueryToken } from "../../inject/query.inject";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { SpreadsheetProvider } from "@shared/shared/providers";

@Injectable()
class TestReportGetFileNestQuery extends TestReportGetFileQueryImpl {
    constructor(
        @InjectModelRepository("TestReport") repository: TestReportRepository,
        @InjectSpreadSheet() spreadsheet: SpreadsheetProvider
    ) {
        super(repository, spreadsheet);
    }
}

export const TestReportGetFileQueryProvider: Provider = {
    provide: TestReportGetFileQueryToken,
    useClass: TestReportGetFileNestQuery
}