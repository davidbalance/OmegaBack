import { FindBranchResponseDTO } from "@/location/branch/dtos";
import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

export class FindCompanyResponseDTO {
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

    @Type(() => FindBranchResponseDTO)
    @Expose()
    public readonly branches: FindBranchResponseDTO[];
}

export class FindCompaniesResponseDTO {
    @Type(() => FindCompanyResponseDTO)
    @Expose()
    public readonly companies: FindCompanyResponseDTO[];
}

class SelectorOptionCompanyDTO implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class FindSelectorOptionsCompanyDTO {
    @Type(() => SelectorOptionCompanyDTO)
    @Expose()
    public readonly options: SelectorOptionCompanyDTO[];
}