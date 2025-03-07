import { Token } from "@omega/auth/core/domain/auth/token.domain";
import { Prisma, Token as PrismaToken } from "@prisma/client";

export class TokenDomainMapper {
    static toPrisma(value: Token): Prisma.TokenUncheckedCreateInput {
        return {
            id: value.id,
            token: value.token,
            authId: value.authId
        };
    }

    static toDomain(value: PrismaToken): Token {
        return Token.rehydrate({ ...value });
    }
}