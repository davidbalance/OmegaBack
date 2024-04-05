import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

export class FindExamResponseDTO {
    @Expose()
    public id: number;

    @Expose()
    public name: string;
}

class SelectorOptionExam implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class FindSelectorOptionsExam {
    @Type(() => SelectorOptionExam)
    @Expose()
    public readonly options: SelectorOptionExam[];
}