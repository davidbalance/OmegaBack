import { DiseaseReport } from "@omega/medical/core/domain/test/disease-report.domain";
import { MedicalDiseaseReport as MedicalDiseaseReport, Prisma } from "@prisma/client";

export class DiseaseReportDomainMapper {
    static toPrisma(value: DiseaseReport): Prisma.MedicalDiseaseReportUncheckedCreateInput {
        return {
            id: value.id,
            commentary: value.commentary,
            diseaseGroupId: value.diseaseGroupId,
            diseaseGroupName: value.diseaseGroupName,
            diseaseId: value.diseaseId,
            diseaseName: value.diseaseName,
            testId: value.testId,
        };
    }

    static toDomain(value: MedicalDiseaseReport): DiseaseReport {
        return DiseaseReport.rehydrate({ ...value });
    }
}