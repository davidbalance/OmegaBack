import { TokenModel } from "@omega/auth/core/model/auth/token.model";
import { TokenModel as PrismaTokenModel } from "@prisma/client";

export class TokenModelMapper {
    static toModel(value: PrismaTokenModel): TokenModel {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return new TokenModel({ ...value });
    }
}