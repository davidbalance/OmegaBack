import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

export class FindCityResponseDTO {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
}

export class FindCitiesResponseDTO {
    @Type(() => FindCityResponseDTO)
    @Expose()
    public readonly cities: FindCityResponseDTO[];
}

class SelectorOptionCityDTO implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class FindSelectorOptionsCityDTO {
    @Type(() => SelectorOptionCityDTO)
    @Expose()
    public readonly options: SelectorOptionCityDTO[];
}