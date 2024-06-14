import { GETCompanyResponseDTO } from "@/location/company/dtos/company.response.dto";
import { Expose, Type } from "class-transformer";

export class GETCorporativeGroupResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => GETCompanyResponseDTO)
    @Expose()
    public readonly companies: GETCompanyResponseDTO[]
}

export class GETCorporativeGroupArrayResponseDTO {
    @Type(() => GETCorporativeGroupResponseDTO)
    @Expose()
    public readonly groups: GETCorporativeGroupResponseDTO[];
}

export class POSTCorporativeGroupResponseDTO extends GETCorporativeGroupResponseDTO { }

export class PATCHCorporativeGroupResponseDTO extends GETCorporativeGroupResponseDTO { }