import { MorbidityGroup } from "@/morbidity/morbidity-group/entities/morbidity-group.entity";

export class CreateMorbidityGroupResponseDTO {
    public readonly group: MorbidityGroup;
}

export class FindMorbidityGroupsResponseDTO {
    public readonly groups: MorbidityGroup[];
}

export class UpdateMorbidityGroupResponseDTO { }

export class InactiveMorbiditGroupResponseDTO { }