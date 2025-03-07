import { CorporativeOptionModel } from "@omega/location/core/models/corporative/corporative-option.model";
import { CorporativeOptionModel as PrismaCorporativeOptionOptionModel } from "@prisma/client";

export class CorporativeOptionModelMapper {
    static toModel(value: PrismaCorporativeOptionOptionModel): CorporativeOptionModel {
        return new CorporativeOptionModel({ ...value });
    }
}