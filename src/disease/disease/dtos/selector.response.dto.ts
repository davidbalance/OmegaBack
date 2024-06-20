import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionDiseaseDto implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDto {
    @Type(() => SelectorOptionDiseaseDto)
    @Expose()
    public readonly options: SelectorOptionDiseaseDto[]
}