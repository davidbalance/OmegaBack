import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamType as PrismaExamType, ExamTypeExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";
import { ExamSubtypeDomainMapper, PrismaExamSubtypeExtended } from "./exam-subtype.domain-mapper";
import { ExamTypeExternalKey } from "@omega/laboratory/core/domain/exam/value-objects/exam-type-external-key.value-object";

type PrismaExamTypeExtended = PrismaExamType & {
    subtypes: PrismaExamSubtypeExtended[];
    externalKeys: PrismaExternalKey[];
};

export class ExamTypeDomainMapper {
    static toPrisma(value: ExamType): Prisma.ExamTypeUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaExamTypeExtended): ExamType {
        return ExamType.rehydrate({
            ...value,
            subtypes: value.subtypes.map(e => ExamSubtypeDomainMapper.toDomain(e)),
            externalKeys: value.externalKeys.map(e => ExamTypeExternalKey.create({ ...e, typeExamId: e.typeId }))
        });
    }
}