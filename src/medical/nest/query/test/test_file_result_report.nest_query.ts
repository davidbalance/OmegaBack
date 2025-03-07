import { Injectable, Provider } from "@nestjs/common";
import { TestFileResultReportQueryToken } from "../../inject/query.inject";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { TestFileResultReportQuery } from "@omega/medical/application/queries/test/test-file-result-report.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { TestFileResultModel } from "@omega/medical/core/model/test/test_file_result.model";

@Injectable()
class TestFileResultReportNestQuery extends TestFileResultReportQuery {
    constructor(
        @InjectModelRepository('TestFileResult') repository: TestFileResultRepository,
        @InjectSpreadSheet() spreadsheet: SpreadsheetProvider<TestFileResultModel>
    ) {
        super(repository, spreadsheet);
    }
}

export const TestFileResultReportQueryProvider: Provider = {
    provide: TestFileResultReportQueryToken,
    useClass: TestFileResultReportNestQuery
}