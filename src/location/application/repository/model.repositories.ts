import { AreaOptionModel } from "@omega/location/core/models/area/area-option.model";
import { AreaModel } from "@omega/location/core/models/area/area.model";
import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { CompanyOptionModel } from "@omega/location/core/models/corporative/company-option.model";
import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { CorporativeOptionModel } from "@omega/location/core/models/corporative/corporative-option.model";
import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { JobPositionOptionModel } from "@omega/location/core/models/jobPosition/job-position-option.model";
import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { ManagementOptionModel } from "@omega/location/core/models/management/management-option.model";
import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { CountRepository, ModelRepository } from "@shared/shared/providers";

export type AreaRepository = ModelRepository<AreaModel> & CountRepository<AreaModel>;
export type AreaOptionRepository = ModelRepository<AreaOptionModel>;

export type BranchRepository = ModelRepository<BranchModel>;
export type CompanyOptionRepository = ModelRepository<CompanyOptionModel>;
export type CompanyRepository = ModelRepository<CompanyModel> & CountRepository<CompanyModel>;
export type CorporativeOptionRepository = ModelRepository<CorporativeOptionModel>;
export type CorporativeRepository = ModelRepository<CorporativeModel> & CountRepository<CorporativeModel>;

export type JobPositionRepository = ModelRepository<JobPositionModel> & CountRepository<JobPositionModel>;
export type JobPositionOptionRepository = ModelRepository<JobPositionOptionModel>;

export type ManagementRepository = ModelRepository<ManagementModel> & CountRepository<ManagementModel>;
export type ManagementOptionRepository = ModelRepository<ManagementOptionModel>;