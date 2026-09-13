import { User } from "@omega/profile/core/domain/user/user.domain";
import { User as PrismaUser, Patient as PrismaPatient, Doctor as PrismaDoctor, Attribute as PrismaAttribute, CompanyFilter as PrismaCompanyFilter, CorporativeFilter as PrismaCorporativeFilter, Prisma } from "@prisma/client";
import { AttributeDomainMapper } from "./attribute.domain-mapper";
import { DoctorDomainMapper } from "./doctor.domain-mapper";
import { PatientDomainMapper } from "./patient.domain-mapper";
import { CompanyFilterDomainMapper } from "./company-filter.domain-mapper";
import { CorporativeFilterDomainMapper } from "./corporative-filter.domain-mapper";

export type PrismaUserWithAttributesAndDoctorAndPatient = PrismaUser & {
    patient: PrismaPatient | null | undefined,
    doctor: PrismaDoctor | null | undefined,
    attributes: PrismaAttribute[],
    companyFilters: PrismaCompanyFilter[],
    corporativeFilters: PrismaCorporativeFilter[]
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
            companyFilters: value.companyFilters.map(e => CompanyFilterDomainMapper.toDomain(e)),
            corporativeFilters: value.corporativeFilters.map(e => CorporativeFilterDomainMapper.toDomain(e)),
            doctor: value.doctor ? DoctorDomainMapper.toDomain(value.doctor) : null,
            patient: value.patient ? PatientDomainMapper.toDomain(value.patient) : null,
        });
    }
}