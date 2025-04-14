import { Exam } from "@omega/laboratory/core/domain/exam/exam.domain";
import { ExamExternalKey } from "@omega/laboratory/core/domain/exam/value-objects/exam-external-key.value-object";
import { Exam as PrismaExam, ExamExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";

export type PrismaExamExtended = PrismaExam & { externalKeys: PrismaExternalKey[] };

export class ExamDomainMapper {
    static toPrisma(value: Exam): Prisma.ExamUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            subtypeId: value.subtypeId
        };
    }

    static toDomain(value: PrismaExamExtended): Exam {
        return Exam.rehydrate({
            ...value,
            externalKeys: value.externalKeys.map(e => ExamExternalKey.create({ ...e }))
        });
    }
}