import { Client } from "@omega/medical/core/domain/client/client.domain";
import { MedicalClient as PrismaClient, MedicalEmail as PrismaEmail, MedicalRecord as PrismaMedicalRecord, Prisma } from "@prisma/client";
import { EmailDomainMapper } from "./email.domain-mapper";
import { RecordDomainMapper } from "./record.domain-mapper";

type MedicalClientWithEmailAndRecords = PrismaClient & { email: PrismaEmail[], records: PrismaMedicalRecord[] }

export class ClientDomainMapper {
    static toPrisma(value: Client): Prisma.MedicalClientUncheckedCreateInput {
        return {
            id: value.id,
            patientDni: value.patientDni,
            patientName: value.patientName,
            patientLastname: value.patientLastname,
            patientGender: value.patientGender,
            patientRole: value.patientRole,
            patientBirthday: value.patientBirthday,
            areaId: value.area?.id,
            areaName: value.area?.name,
            jobPosition: value.jobPosition,
            managementId: value.management?.id,
            managementName: value.management?.name,
        };
    }

    static toDomain(value: MedicalClientWithEmailAndRecords): Client {
        return Client.rehydrate({
            ...value,
            email: value.email.map(e => EmailDomainMapper.toDomain(e)),
            records: value.records.map(e => RecordDomainMapper.toDomain(e))
        });
    }
}