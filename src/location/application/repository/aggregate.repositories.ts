import { Area, AreaProps } from "@omega/location/core/domain/area/area.domain";
import { CorporativeProps, Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { JobPosition, JobPositionProps } from "@omega/location/core/domain/job-position/job-position.domain";
import { Management, ManagementProps } from "@omega/location/core/domain/management/management.domain";
import { AggregateRepository } from "@shared/shared/providers";

export type AreaRepository = AggregateRepository<AreaProps, Area>;
export type CorporativeRepository = AggregateRepository<CorporativeProps, Corporative>;
export type JobPositionRepository = AggregateRepository<JobPositionProps, JobPosition>;
export type ManagementRepository = AggregateRepository<ManagementProps, Management>;