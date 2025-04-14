import { AreaModel } from "@omega/location/core/models/area/area.model";
import { AreaModel as PrismaAreaModel } from "@prisma/client";

export class AreaModelMapper {
    static toModel(value: PrismaAreaModel): AreaModel {
        return new AreaModel({ ...value });
    }
}