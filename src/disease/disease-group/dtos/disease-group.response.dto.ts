import { SelectorOption } from "@/shared";

export class FindDiseaseGroup {
    public readonly id: number;
    public readonly name: string;
}

export class FindDiseaseGroupSelectorOptionsResponseDTO {
    public readonly options: SelectorOption<number>[];
}

export class CreateDiseaseGroupResponseDTO { }

export class FindDiseaseGroupsResponseDTO {
    public readonly diseaseGroups: FindDiseaseGroup[]
}

export class FindOneDiseaseGroupAndUpdateResponseDTO { }

export class FindOneDiseaseGroupAndDeleteResponseDTO { }