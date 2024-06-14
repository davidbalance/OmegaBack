import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionDiseaseDTO implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDTO {
    @Type(() => SelectorOptionDiseaseDTO)
    @Expose()
    public readonly options: SelectorOptionDiseaseDTO[]
}