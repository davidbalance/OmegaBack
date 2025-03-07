import { DiseaseReportModel } from "@omega/medical/core/model/test/disease-report.model";
import { DiseaseReportModel as PrismaDiseaseReportModel } from "@prisma/client";

export class DiseaseReportModelMapper {
    static toModel(value: PrismaDiseaseReportModel): DiseaseReportModel {
        return new DiseaseReportModel({ ...value });
    }
}