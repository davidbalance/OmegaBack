import { AuthResourceModel } from "@omega/auth/core/model/auth/auth-resource.model";
import { AuthResourceModel as PrismaAuthResourceModel } from "@prisma/client";

export class AuthResourceModelMapper {
    static toModel(value: PrismaAuthResourceModel): AuthResourceModel {
        return new AuthResourceModel({ ...value });
    }
}