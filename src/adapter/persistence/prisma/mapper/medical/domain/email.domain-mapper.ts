import { Email } from "@omega/medical/core/domain/client/email.domain";
import { MedicalEmail as PrismaEmail, Prisma } from "@prisma/client";

export class EmailDomainMapper {
    static toPrisma(value: Email): Prisma.MedicalEmailUncheckedCreateInput {
        return {
            id: value.id,
            email: value.email,
            clientId: value.clientId
        };
    }

    static toDomain(value: PrismaEmail): Email {
        return Email.rehydrate({ ...value });
    }
}