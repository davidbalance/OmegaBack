import { Result } from "@omega/medical/core/domain/test/result.domain";
import { MedicalResult as PrismaResult, Prisma } from "@prisma/client";

export class ResultDomainMapper {
    static toPrisma(value: Result): Prisma.MedicalResultUncheckedCreateInput {
        return {
            id: value.id,
            filepath: value.filepath,
            testId: value.testId
        };
    }

    static toDomain(value: PrismaResult): Result {
        return Result.rehydrate({
            ...value,
            filepath: value.filepath ?? ''
        });
    }
}