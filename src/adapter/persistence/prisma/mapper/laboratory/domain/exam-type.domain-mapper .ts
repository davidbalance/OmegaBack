import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamType as PrismaExamType, ExamSubtype as PrismaExamSubtype, Exam as PrismaExam, Prisma } from "@prisma/client";
import { ExamSubtypeDomainMapper } from "./exam-subtype.domain-mapper";

type PrismaExamSubtypeWithExams = PrismaExamSubtype & { exams: PrismaExam[] };
type PrismaExamTypeWithSubtypes = PrismaExamType & { subtypes: PrismaExamSubtypeWithExams[] };

export class ExamTypeDomainMapper {
    static toPrisma(value: ExamType): Prisma.ExamTypeUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaExamTypeWithSubtypes): ExamType {
        return ExamType.rehydrate({
            ...value,
            subtypes: value.subtypes.map(e => ExamSubtypeDomainMapper.toDomain(e))
        });
    }
}