import { CorporativeOptionModel } from "@omega/location/core/models/corporative/corporative-option.model";
import { CorporativeOptionModel as PrismaCorporativeOptionModel } from "@prisma/client";

export class CorporativeOptionModelMapper {
    static toModel(value: PrismaCorporativeOptionModel): CorporativeOptionModel {
        return new CorporativeOptionModel({ ...value });
    }
}