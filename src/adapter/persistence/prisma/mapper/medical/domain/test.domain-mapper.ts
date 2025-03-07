import { Test } from "@omega/medical/core/domain/test/test.domain";
import {
    MedicalTest as PrismaTest,
    MedicalReport as PrismaReport,
    MedicalResult as PrismaResult,
    MedicalDiseaseReport as PrismaDisease,
    Prisma
} from "@prisma/client";
import { ResultDomainMapper } from "./result.domain-mapper";
import { ReportDomainMapper } from "./report.domain-mapper";
import { DiseaseReportDomainMapper } from "./disease_report.domain-mapper";

type PrismaTestWithResultAndReportAndDiseases = PrismaTest & {
    result: PrismaResult,
    report: PrismaReport,
    diseases: PrismaDisease[]
}

export class TestDomainMapper {
    static toPrisma(value: Test): Prisma.MedicalTestUncheckedCreateInput {
        return {
            id: value.id,
            examName: value.exam.name,
            examSubtype: value.exam.subtype,
            examType: value.exam.type,
            orderId: value.orderId
        };
    }

    static toDomain(value: PrismaTestWithResultAndReportAndDiseases): Test {
        return Test.rehydrate({
            ...value,
            diseases: value.diseases.map(e => DiseaseReportDomainMapper.toDomain(e)),
            result: ResultDomainMapper.toDomain(value.result),
            report: ReportDomainMapper.toDomain(value.report)
        });
    }
}