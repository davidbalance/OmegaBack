import { GETCityResponseDTO } from "@/location/city/dto/city.response.dto";
import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

export class GETBranchResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => GETCityResponseDTO)
    @Expose()
    public readonly city: GETCityResponseDTO;
}

export class GETBranchArrayResponseDTO {
    @Type(() => GETBranchResponseDTO)
    @Expose()
    public readonly branches: GETBranchResponseDTO[];
}

export class POSTBranchResponseDTO extends GETBranchResponseDTO { }

export class PATCHBranchResponseDTO extends GETBranchResponseDTO { }