import { ReportModel } from "@omega/medical/core/model/test/report.model";
import { ReportResponseDto } from "../dto/response/test.dto";

export class ReportModelMapper {
    public static toDTO(value: ReportModel): ReportResponseDto {
        return {

            testId: value.testId,
            reportContent: value.reportContent ?? null
        }
    }
}