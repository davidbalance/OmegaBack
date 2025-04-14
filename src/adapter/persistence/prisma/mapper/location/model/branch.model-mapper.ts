import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { BranchModel as PrismaBranchModel } from "@prisma/client";

export class BranchModelMapper {
    static toModel(value: PrismaBranchModel): BranchModel {
        return new BranchModel({ ...value });
    }
}