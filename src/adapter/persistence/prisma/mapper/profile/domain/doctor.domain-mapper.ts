import { Doctor } from "@omega/profile/core/domain/user/doctor.domain";
import { Doctor as PrismaDoctor, Prisma } from "@prisma/client";

export class DoctorDomainMapper {
    static toPrisma(value: Doctor): Prisma.DoctorUncheckedCreateInput {
        return {
            ...value,
            id: value.id,
            userId: value.userId,
            signature: value.signature
        }
    }

    static toDomain(value: PrismaDoctor): Doctor {
        return Doctor.rehydrate({ ...value });
    }
}