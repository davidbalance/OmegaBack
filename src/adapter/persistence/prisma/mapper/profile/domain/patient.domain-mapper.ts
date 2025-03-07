import { Patient } from "@omega/profile/core/domain/user/patient.domain";
import { Patient as PrismaPatient, Prisma } from "@prisma/client";

export class PatientDomainMapper {
    static toPrisma(value: Patient): Prisma.PatientUncheckedCreateInput {
        return {
            ...value,
            id: value.id,
            userId: value.userId,
            birthday: value.birthday,
            gender: value.gender
        }
    }

    static toDomain(value: PrismaPatient): Patient {
        return Patient.rehydrate({ ...value });
    }
}