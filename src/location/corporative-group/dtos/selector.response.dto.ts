import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionCorporativeGroupDto implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDto {
    @Type(() => SelectorOptionCorporativeGroupDto)
    @Expose()
    public readonly options: SelectorOptionCorporativeGroupDto[];
}