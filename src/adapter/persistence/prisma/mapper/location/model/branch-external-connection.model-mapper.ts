import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";
import { BranchExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";

export class BranchExternalConnectionModelMapper {
    static toModel(value: PrismaExternalConnection): BranchExternalConnectionModel {
        return new BranchExternalConnectionModel({ ...value });
    }
}