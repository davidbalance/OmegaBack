import { DiseaseGroupOptionModel } from "@omega/disease/core/model/disease/disease-group-option.model";
import { DiseaseGroupOptionModel as PrismaDiseaseGroupOptionModel } from "@prisma/client";

export class DiseaseGroupOptionModelMapper {
    static toModel(value: PrismaDiseaseGroupOptionModel): DiseaseGroupOptionModel {
        return new DiseaseGroupOptionModel({ ...value });
    }
}