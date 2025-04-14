import { Logo } from "@omega/auth/core/domain/logo/logo.domain";
import { Prisma, Logo as PrismaLogo } from "@prisma/client";

export class LogoDomainMapper {
    static toPrisma(value: Logo): Prisma.LogoUncheckedCreateInput {
        return {
            id: value.id,
            name: value.name
        };
    }

    static toDomain(value: PrismaLogo): Logo {
        return Logo.rehydrate({ ...value });
    }
}