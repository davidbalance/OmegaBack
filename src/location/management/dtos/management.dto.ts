import { AreaResponseDto } from "@/location/area/dtos/area.dto";
import { Expose, Type } from "class-transformer";

export class ManagementResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => AreaResponseDto)
    @Expose()
    public readonly areas: AreaResponseDto[];
}