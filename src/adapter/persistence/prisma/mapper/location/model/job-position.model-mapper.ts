import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { JobPositionModel as PrismaJobPositionModel } from "@prisma/client";

export class JobPositionModelMapper {
    static toModel(value: PrismaJobPositionModel): JobPositionModel {
        return new JobPositionModel({ ...value });
    }
}