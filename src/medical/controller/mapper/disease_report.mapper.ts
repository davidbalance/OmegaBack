import { DiseaseReportModel } from "@omega/medical/core/model/test/disease-report.model";
import { DiseaseReportResponseDto } from "../dto/response/test.dto";

export class DiseaseReportModelMapper {
    public static toDTO(value: DiseaseReportModel): DiseaseReportResponseDto {
        return {
            diseaseReportId: value.diseaseReportId,
            diseaseId: value.diseaseId,
            diseaseName: value.diseaseName,
            diseaseGroupId: value.diseaseGroupId,
            diseaseGroupName: value.diseaseGroupName,
            diseaseCommentary: value.diseaseCommentary,
        }
    }
}