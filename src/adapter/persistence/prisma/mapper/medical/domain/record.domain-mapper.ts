import { Record } from "@omega/medical/core/domain/client/record.domain";
import { MedicalRecord as PrismaRecord, Prisma } from "@prisma/client";

export class RecordDomainMapper {
    static toPrisma(value: Record): Prisma.MedicalRecordUncheckedCreateInput {
        return {
            id: value.id,
            filepath: value.filepath,
            name: value.name,
            createdAt: value.createAt,
            clientId: value.clientId
        };
    }

    static toDomain(value: PrismaRecord): Record {
        return Record.rehydrate({
            ...value,
            createAt: value.createdAt
        });
    }
}