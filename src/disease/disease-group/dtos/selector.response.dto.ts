import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionDiseaseGroupDto implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDto {
    @Type(() => SelectorOptionDiseaseGroupDto)
    @Expose()
    public readonly options: SelectorOptionDiseaseGroupDto[]
}