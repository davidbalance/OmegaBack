import { DiseaseGroupOptionModel } from "@omega/disease/core/model/disease/disease-group-option.model";
import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { CountRepository, ModelRepository } from "@shared/shared/providers";

export type DiseaseGroupOptionRepository = ModelRepository<DiseaseGroupOptionModel>;
export type DiseaseGroupRepository = ModelRepository<DiseaseGroupModel> & CountRepository<DiseaseGroupModel>;
export type DiseaseRepository = ModelRepository<DiseaseModel> & CountRepository<DiseaseModel>;