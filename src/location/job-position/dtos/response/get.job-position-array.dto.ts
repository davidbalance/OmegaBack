import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { JobPositionResponseDto } from "./base.job-position.dto";
import { Expose, Type } from "class-transformer";

export class GetJobPositionArrayReponseDto implements ObjectArrayResponse<JobPositionResponseDto> {
    @Expose()
    @Type(() => JobPositionResponseDto)
    public readonly data: JobPositionResponseDto[];
}