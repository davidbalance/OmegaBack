import { UserAttributeModel } from "@omega/profile/core/model/user/user-attribute.model";
import { UserAttributeModel as PrismaUserAttributeModel } from "@prisma/client";

export class UserAttributeModelMapper {
    static toModel(value: PrismaUserAttributeModel): UserAttributeModel {
        return new UserAttributeModel({ ...value });
    }
}