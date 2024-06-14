import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionCityDTO implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDTO {
    @Type(() => SelectorOptionCityDTO)
    @Expose()
    public readonly options: SelectorOptionCityDTO[];
}