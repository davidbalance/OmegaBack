import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { DiseaseGroupModel as PrismaDiseaseGroupModel } from "@prisma/client";

export class DiseaseGroupModelMapper {
    static toModel(value: PrismaDiseaseGroupModel): DiseaseGroupModel {
        return new DiseaseGroupModel({ ...value });
    }
}