import { SelectorOption, SelectorOptionArray } from "@/shared/utils/bases/base.selector";
import { Expose, Type } from "class-transformer";

class CompanyGroupOption implements SelectorOption<number> {
    @Expose() public readonly key: number;
    @Expose() public readonly label: string;
}

export class GetCompanySelectorOptionArrayResponseDto implements SelectorOptionArray<CompanyGroupOption> {
    @Type(() => CompanyGroupOption)
    @Expose() options: CompanyGroupOption[];
}