import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionDiseaseGroupDTO implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDTO {
    @Type(() => SelectorOptionDiseaseGroupDTO)
    @Expose()
    public readonly options: SelectorOptionDiseaseGroupDTO[]
}