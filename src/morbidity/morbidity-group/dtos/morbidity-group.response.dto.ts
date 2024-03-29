import { SelectorOption } from "@/shared";

export class FindMorbidityGroup {
    public readonly id: number;
    public readonly name: string;
}

export class FindMorbidityGroupSelectorOptionsResponseDTO {
    public readonly options: SelectorOption<number>[];
}

export class CreateMorbidityGroupResponseDTO { }

export class FindMorbidityGroupsResponseDTO {
    public readonly morbidityGroups: FindMorbidityGroup[]
}

export class FindOneMorbidityGroupAndUpdateResponseDTO { }

export class FindOneMorbidityGroupAndDeleteResponseDTO { }