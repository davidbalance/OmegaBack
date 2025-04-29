import { Injectable, Provider } from "@nestjs/common";
import { TestFileResultReportQueryToken } from "../../inject/query.inject";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { TestFileResultReportQueryImpl } from "@omega/medical/application/queries/test/test-file-result-report.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { SpreadsheetProvider } from "@shared/shared/providers";

@Injectable()
class TestFileResultReportNestQuery extends TestFileResultReportQueryImpl {
    constructor(
        @InjectModelRepository('TestFileResult') repository: TestFileResultRepository,
        @InjectSpreadSheet() spreadsheet: SpreadsheetProvider
    ) {
        super(repository, spreadsheet);
    }
}

export const TestFileResultReportQueryProvider: Provider = {
    provide: TestFileResultReportQueryToken,
    useClass: TestFileResultReportNestQuery
}