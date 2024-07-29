import { SelectorOption, SelectorOptionArray } from "@/shared/utils/bases/base.selector";
import { Expose, Type } from "class-transformer";

class DiseaseOptionResposeDto implements SelectorOption<number> {
    @Expose() public readonly key: number;
    @Expose() public readonly label: string;
}

export class GetDiseaseSelectorResponseDto implements SelectorOptionArray<DiseaseOptionResposeDto> {
    @Type(() => DiseaseOptionResposeDto)
    @Expose() public readonly options: DiseaseOptionResposeDto[];
}