import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionBranchDto implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDto {
    @Type(() => SelectorOptionBranchDto)
    @Expose()
    public readonly options: SelectorOptionBranchDto[];
}