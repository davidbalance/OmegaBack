import { SelectorOption, SelectorOptionArray } from "@/shared/utils/bases/base.selector";
import { Expose, Type } from "class-transformer";

class CorporativeGroupOption implements SelectorOption<number> {
    @Expose() public readonly key: number;
    @Expose() public readonly label: string;
}

export class GetCorporativeGroupSelectorOptionArrayResponseDto implements SelectorOptionArray<CorporativeGroupOption> {
    @Type(() => CorporativeGroupOption)
    @Expose() options: CorporativeGroupOption[];
}