import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionCorporativeGroupDTO implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class FindSelectorOptionsCorporativeGroupDTO {
    @Type(() => SelectorOptionCorporativeGroupDTO)
    @Expose()
    public readonly options: SelectorOptionCorporativeGroupDTO[];
}