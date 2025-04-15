import { UserModel } from "@omega/profile/core/model/user/user.model";
import { UserModel as PrismaUserModel } from "@prisma/client";

export class UserModelMapper {
    static toModel(value: PrismaUserModel): UserModel {
        return new UserModel({ ...value });
    }
}