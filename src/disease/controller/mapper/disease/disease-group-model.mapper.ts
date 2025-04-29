import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { DiseaseGroupResponseDto } from "../../dto/response/disease-group.dto";

export class DiseaseGroupModelMapper {
    public static toDTO(value: DiseaseGroupModel): DiseaseGroupResponseDto {
        return {
            groupId: value.groupId,
            groupName: value.groupName,
            hasDiseases: value.hasDiseases
        }
    }
}