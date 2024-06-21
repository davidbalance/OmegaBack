import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionExam implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDto {
    @Type(() => SelectorOptionExam)
    @Expose()
    public readonly options: SelectorOptionExam[];
}