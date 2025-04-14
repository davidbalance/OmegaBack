import { ExamSubtype } from "@omega/laboratory/core/domain/exam/exam-subtype.domain";
import { ExamSubtype as PrismaExamSubtype, ExamSubtypeExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";
import { ExamDomainMapper, PrismaExamExtended } from "./exam.domain-mapper";
import { ExamSubtypeExternalKey } from "@omega/laboratory/core/domain/exam/value-objects/exam-subtype-external-key.value-object";

export type PrismaExamSubtypeExtended = PrismaExamSubtype & {
    exams: PrismaExamExtended[],
    externalKeys: PrismaExternalKey[]
}

export class ExamSubtypeDomainMapper {
    static toPrisma(value: ExamSubtype): Prisma.ExamSubtypeUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            typeId: value.typeId
        };
    }

    static toDomain(value: PrismaExamSubtypeExtended): ExamSubtype {
        return ExamSubtype.rehydrate({
            ...value,
            exams: value.exams.map(e => ExamDomainMapper.toDomain(e)),
            externalKeys: value.externalKeys.map(e => ExamSubtypeExternalKey.create({ ...e, subtypeExamId: e.subtypeId }))
        });
    }
}