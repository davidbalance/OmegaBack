import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { JobPosition } from "./job-position.base.dto";
import { Expose, Type } from "class-transformer";

export class GetJobPositionArrayReponseDto implements ObjectArrayResponse<JobPosition> {
    @Type(() => JobPosition)
    @Expose() public readonly data: JobPosition[];
}