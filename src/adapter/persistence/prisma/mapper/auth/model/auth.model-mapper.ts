import { AuthModel } from "@omega/auth/core/model/auth/auth.model";
import { AuthModel as PrismaAuthModel} from "@prisma/client";

export class AuthModelMapper {
    static toModel(value: PrismaAuthModel): AuthModel {
        return new AuthModel({ ...value });
    }
}