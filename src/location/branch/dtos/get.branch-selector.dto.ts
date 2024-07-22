import { SelectorOption, SelectorOptionArray } from "@/shared/utils/bases/base.selector";
import { Expose, Type } from "class-transformer";

class BranchOption implements SelectorOption<number> {
    @Expose() public readonly key: number;
    @Expose() public readonly label: string;
}

export class GetBranchSelectorOptionArrayResponseDto implements SelectorOptionArray<BranchOption> {
    @Type(() => BranchOption)
    @Expose() options: BranchOption[];
}