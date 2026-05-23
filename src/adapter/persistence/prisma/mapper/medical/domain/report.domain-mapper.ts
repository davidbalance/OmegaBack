import { Report } from "@omega/medical/core/domain/test/report.domain";
import { MedicalReport as PrismaReport, Prisma } from "@prisma/client";

export class ReportDomainMapper {
    static toPrisma(value: Report): Prisma.MedicalReportUncheckedCreateInput {
        return {
            id: value.id,
            testId: value.testId,
        };
    }

    static toDomain(value: PrismaReport): Report {
        return Report.rehydrate({ ...value });
    }
}