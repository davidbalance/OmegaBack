import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

export class FindDiseaseGroupResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;
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