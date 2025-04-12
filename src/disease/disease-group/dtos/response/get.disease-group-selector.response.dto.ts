import { SelectorOption, SelectorOptionArray } from "@/shared/utils/bases/base.selector";
import { Expose, Type } from "class-transformer";

class DiseaseGroupOption implements SelectorOption<number> {
    @Expose() public readonly key: number;
    @Expose() public readonly label: string;
}

export class GetDiseaseGroupSelectorOptionArrayResponseDto implements SelectorOptionArray<DiseaseGroupOption> {
    @Type(() => DiseaseGroupOption)
    @Expose() options: DiseaseGroupOption[];
}