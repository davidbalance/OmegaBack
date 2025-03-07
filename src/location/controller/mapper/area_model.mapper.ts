import { AreaResponseDto } from "../dto/response/area.dto";
import { AreaModel } from "@omega/location/core/models/area/area.model";

export class AreaModelMapper {
    public static toDTO(value: AreaModel): AreaResponseDto {
        return {
            areaId: value.areaId,
            areaName: value.areaName
        }
    }
}