import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionCompanyDto implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDto {
    @Type(() => SelectorOptionCompanyDto)
    @Expose()
    public readonly options: SelectorOptionCompanyDto[];
}