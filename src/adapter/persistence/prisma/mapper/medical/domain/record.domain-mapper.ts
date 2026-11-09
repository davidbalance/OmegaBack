import { Record, RecordProps, RecordPropsV1, RecordPropsV2 } from "@omega/medical/core/domain/client/record.domain";
import { MedicalRecord as PrismaRecord, Prisma } from "@prisma/client";

export class RecordDomainMapper {
    static toPrisma(value: Record): Prisma.MedicalRecordUncheckedCreateInput {
        return {
            id: value.id,
            filepath: value.filepath,
            metadata: value.metadata!,
            name: value.name,
            createdAt: value.createAt,
            clientId: value.clientId,
            version: value.version,
            status: value.status as any
        };
    }

    static toDomain(value: PrismaRecord): Record {
        let payload: RecordProps
        if (value.version == "v1") {
            payload = {
                ...value,
                filepath: value.filepath!,
                version: "v1",
                createAt: value.createdAt
            } satisfies RecordPropsV1;
        } else {
            payload = {
                ...value,
                metadata: value.metadata,
                version: "v2",
                createAt: value.createdAt
            } as RecordPropsV2;
        }
        return Record.rehydrate(payload);
    }
}