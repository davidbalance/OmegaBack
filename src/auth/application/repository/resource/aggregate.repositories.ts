import { Resource, ResourceProps } from "@omega/auth/core/domain/resource/resource.domain";
import { AggregateRepository } from "@shared/shared/providers";

export type ResourceRepository = AggregateRepository<ResourceProps, Resource>;