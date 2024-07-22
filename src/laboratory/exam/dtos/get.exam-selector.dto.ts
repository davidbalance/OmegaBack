import { SelectorOption, SelectorOptionArray } from "@/shared/utils/bases/base.selector";
import { Expose, Type } from "class-transformer";

class ExamOption implements SelectorOption<number> {
    @Expose() public readonly key: number;
    @Expose() public readonly label: string;
}

export class GetExamSelectorOptionArrayResponseDto implements SelectorOptionArray<ExamOption> {
    @Type(() => ExamOption)
    @Expose() options: ExamOption[];
}