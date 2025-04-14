import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { DiseaseModel as PrismaDiseaseModel } from "@prisma/client";

export class DiseaseModelMapper {
    static toModel(value: PrismaDiseaseModel): DiseaseModel {
        return new DiseaseModel({ ...value });
    }
}