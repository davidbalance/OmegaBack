import { User } from "@omega/profile/core/domain/user/user.domain";
import { User as PrismaUser, Patient as PrismaPatient, Doctor as PrismaDoctor, Attribute as PrismaAttribute, Prisma } from "@prisma/client";
import { AttributeDomainMapper } from "./attribute.domain-mapper";
import { DoctorDomainMapper } from "./doctor.domain-mapper";
import { PatientDomainMapper } from "./patient.domain-mapper";

type PrismaUserWithAttributesAndDoctorAndPatient = PrismaUser & {
    patient: PrismaPatient | null | undefined,
    doctor: PrismaDoctor | null | undefined,
    attributes: PrismaAttribute[]
}

export class UserDomainMapper {
    static toPrisma(value: User): Prisma.UserUncheckedCreateInput {
        return {
            id: value.id,
            dni: value.dni,
            name: value.name,
            lastname: value.lastname,
            email: value.email
        }
    }

    static toDomain(value: PrismaUserWithAttributesAndDoctorAndPatient): User {
        return User.rehydrate({
            ...value,
            attributes: value.attributes.map(e => AttributeDomainMapper.toDomain(e)),
            doctor: value.doctor ? DoctorDomainMapper.toDomain(value.doctor) : null,
            patient: value.patient ? PatientDomainMapper.toDomain(value.patient) : null,
        });
    }
}