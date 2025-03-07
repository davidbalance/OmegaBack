import { AreaOptionModel } from "@omega/location/core/models/area/area-option.model";
import { AreaOptionModel as PrismaAreaOptionModel } from "@prisma/client";

export class AreaOptionModelMapper {
    static toModel(value: PrismaAreaOptionModel): AreaOptionModel {
        return new AreaOptionModel({ ...value });
    }
}