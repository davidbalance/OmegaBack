import { FindCityResponseDTO } from "@/location/city/dto";
import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

export class FindBranchResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => FindCityResponseDTO)
    @Expose()
    public readonly city: FindCityResponseDTO;
}

export class FindBranchesResponseDTO {
    @Type(() => FindBranchResponseDTO)
    @Expose()
    public readonly branches: FindBranchResponseDTO[];
}

class SelectorOptionBranchDTO implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class FindSelectorOptionsBranchDTO {
    @Type(() => SelectorOptionBranchDTO)
    @Expose()
    public readonly options: SelectorOptionBranchDTO[];
}