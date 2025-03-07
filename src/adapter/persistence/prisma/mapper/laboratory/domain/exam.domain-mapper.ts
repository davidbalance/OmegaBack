import { Exam } from "@omega/laboratory/core/domain/exam/exam.domain";
import { Exam as PrismaExam, Prisma } from "@prisma/client";

export class ExamDomainMapper {
    static toPrisma(value: Exam): Prisma.ExamUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name,
            subtypeId: value.subtypeId
        };
    }

    static toDomain(value: PrismaExam): Exam {
        return Exam.rehydrate({ ...value });
    }
}