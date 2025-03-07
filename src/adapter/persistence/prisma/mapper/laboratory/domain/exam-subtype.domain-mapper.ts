import { ExamSubtype } from "@omega/laboratory/core/domain/exam/exam-subtype.domain";
import { ExamSubtype as PrismaExamSubtype, Exam as PrismaExam, Prisma } from "@prisma/client";
import { ExamDomainMapper } from "./exam.domain-mapper";

type PrismaExamSubtypeWithExams = PrismaExamSubtype & { exams: PrismaExam[] }

export class ExamSubtypeDomainMapper {
    static toPrisma(value: ExamSubtype): Prisma.ExamSubtypeUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            typeId: value.typeId
        };
    }

    static toDomain(value: PrismaExamSubtypeWithExams): ExamSubtype {
        return ExamSubtype.rehydrate({
            ...value,
            exams: value.exams.map(e => ExamDomainMapper.toDomain(e))
        });
    }
}