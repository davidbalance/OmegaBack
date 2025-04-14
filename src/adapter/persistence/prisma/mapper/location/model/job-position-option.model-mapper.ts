import { JobPositionOptionModel } from "@omega/location/core/models/jobPosition/job-position-option.model";
import { JobPositionOptionModel as PrismaJobPositionOptionModel } from "@prisma/client";

export class JobPositionOptionModelMapper {
    static toModel(value: PrismaJobPositionOptionModel): JobPositionOptionModel {
        return new JobPositionOptionModel({ ...value });
    }
}