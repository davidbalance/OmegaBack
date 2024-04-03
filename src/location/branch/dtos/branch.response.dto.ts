import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

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