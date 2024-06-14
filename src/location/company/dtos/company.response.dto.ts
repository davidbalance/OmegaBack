import { GETBranchResponseDTO } from "@/location/branch/dtos/branch.response.dto";
import { Expose, Type } from "class-transformer";

export class GETCompanyResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly ruc: string;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly address: string;

    @Expose()
    public readonly phone: string;

    @Type(() => GETBranchResponseDTO)
    @Expose()
    public readonly branches: GETBranchResponseDTO[];
}

export class GETCompanyArrayResponseDTO {
    @Type(() => GETCompanyResponseDTO)
    @Expose()
    public readonly companies: GETCompanyResponseDTO[];
}

export class POSTCompanyResponseDTO extends GETCompanyResponseDTO { }

export class PATCHCompanyResponseDTO extends GETCompanyResponseDTO { }