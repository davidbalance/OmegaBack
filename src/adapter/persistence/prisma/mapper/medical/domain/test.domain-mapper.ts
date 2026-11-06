import { Test } from "@omega/medical/core/domain/test/test.domain";
import { MedicalTest as PrismaTest, MedicalResult as PrismaResult, MedicalDiseaseReport as PrismaDisease, MedicalTestExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";
import { ResultDomainMapper } from "./result.domain-mapper";
import { DiseaseReportDomainMapper } from "./disease-report.domain-mapper";
import { TestExternalKey } from "@omega/medical/core/domain/test/value-objects/test-external-key.value-object";

export type PrismaTestWithResultAndReportAndDiseases = PrismaTest & {
    result: PrismaResult,
    diseases: PrismaDisease[],
    externalKeys: PrismaExternalKey[],
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
            externalKeys: value.externalKeys.map(e => TestExternalKey.create({ ...e }))
        });
    }
}