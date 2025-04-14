import { JobPosition } from "@omega/location/core/domain/job-position/job-position.domain";
import { JobPosition as PrismaJobPosition, Prisma } from "@prisma/client";

export class JobPositionDomainMapper {
    static toPrisma(value: JobPosition): Prisma.JobPositionUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaJobPosition): JobPosition {
        return JobPosition.rehydrate({ ...value });
    }
}