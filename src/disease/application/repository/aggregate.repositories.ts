import { DiseaseGroup, DiseaseGroupProps } from "@omega/disease/core/domain/disease-group.domain";
import { AggregateRepository } from "@shared/shared/providers";

export type DiseaseGroupRepository = AggregateRepository<DiseaseGroupProps, DiseaseGroup>