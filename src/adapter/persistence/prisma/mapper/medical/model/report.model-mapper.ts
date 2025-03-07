import { ReportModel } from "@omega/medical/core/model/test/report.model";
import { ReportModel as PrismaReportModel } from "@prisma/client";

export class ReportModelMapper {
    static toModel(value: PrismaReportModel): ReportModel {
        return new ReportModel({ ...value });
    }
}