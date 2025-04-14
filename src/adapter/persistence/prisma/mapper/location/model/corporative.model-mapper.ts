import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { CorporativeModel as PrismaCorporativeModel } from "@prisma/client";

export class CorporativeModelMapper {
    static toModel(value: PrismaCorporativeModel): CorporativeModel {
        return new CorporativeModel({ ...value });
    }
}