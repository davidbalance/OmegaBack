import { CorporativeFilterModel } from "@omega/profile/core/model/user/corporative-filter.model";
import { CorporativeFilterModel as PrismaCorporativeFilterModel } from "@prisma/client";

export class CorporativeFilterModelMapper {
    static toModel(value: PrismaCorporativeFilterModel): CorporativeFilterModel {
        return new CorporativeFilterModel({ ...value });
    }
}