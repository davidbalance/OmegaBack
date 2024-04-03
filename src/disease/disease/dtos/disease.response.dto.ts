import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class DiseaseGroupDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;
}

export class FindDiseaseResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => DiseaseGroupDTO)
    @Expose()
    public readonly group: DiseaseGroupDTO;
}

export class FindDiseasesResponseDTO {
    @Type(() => FindDiseaseResponseDTO)
    @Expose()
    public readonly diseases: FindDiseaseResponseDTO[]
}

class SelectorOptionDiseaseDTO implements SelectorOption<number>{
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class FindSelectorOptionsDiseaseDTO {
    @Type(() => SelectorOptionDiseaseDTO)
    @Expose()
    public readonly options: SelectorOptionDiseaseDTO[]
}

export class FindOneDiseaseAndDeleteResponseDTO { }
