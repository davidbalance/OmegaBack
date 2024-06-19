import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionCitDto implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDto {
    @Type(() => SelectorOptionCitDto)
    @Expose()
    public readonly options: SelectorOptionCitDto[];
}