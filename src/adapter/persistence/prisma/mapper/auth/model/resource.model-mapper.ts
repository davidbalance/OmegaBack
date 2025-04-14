import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";
import { ResourceModel as PrismaResourceModel } from "@prisma/client";

export class ResourceModelMapper {
    static toModel(value: PrismaResourceModel): ResourceModel {
        return new ResourceModel({ ...value });
    }
}