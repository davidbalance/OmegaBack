import { SelectorOption, SelectorOptionArray } from "@/shared/utils/bases/base.selector";
import { Expose, Type } from "class-transformer";

class CityOption implements SelectorOption<number> {
    @Expose() public readonly key: number;
    @Expose() public readonly label: string;
}

export class GETSelectorOptionArrayResponseDto implements SelectorOptionArray<CityOption> {
    @Type(() => CityOption)
    @Expose() options: CityOption[];
}