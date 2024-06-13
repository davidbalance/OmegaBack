import { FindDiseaseResponseDTO } from "@/disease/disease/dtos";
import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class DiseaseResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: number;
}

export class FindDiseaseGroupResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => DiseaseResponseDTO)
    @Expose()
    public readonly diseases: DiseaseResponseDTO[]
}

export class FindDiseaseGroupsResponseDTO {
    @Type(() => FindDiseaseGroupResponseDTO)
    @Expose()
    public readonly groups: FindDiseaseGroupResponseDTO[];
}

class SelectorOptionDiseaseGroup implements SelectorOption<number> {
    @Expose()
    public readonly key: number;
    @Expose()
    public readonly label: string;
}

export class FindSelectorOptionsDiseaseGroupDTO {
    @Type(() => SelectorOptionDiseaseGroup)
    @Expose()
    public readonly options: SelectorOptionDiseaseGroup[];
}

export class FindOneDiseaseGroupAndUpdateResponseDTO { }

export class FindOneDiseaseGroupAndDeleteResponseDTO { }