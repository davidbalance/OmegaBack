import { TestReportModel } from "@omega/medical/core/model/test/test-report.model";
import { TestReportModel as PrismaTestReportModel } from "@prisma/client";

export class TestReportModelMapper {
    static toModel(value: PrismaTestReportModel): TestReportModel {
        return new TestReportModel({ ...value });
    }
}