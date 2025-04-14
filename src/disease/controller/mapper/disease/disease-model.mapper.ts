import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { DiseaseResponseDto } from "../../dto/response/disease.dto";

export class DiseaseModelMapper {
    public static toDTO(value: DiseaseModel): DiseaseResponseDto {
        return {
            diseaseId: value.diseaseId,
            diseaseName: value.diseaseName,
            groupId: value.groupId
        }
    }
}