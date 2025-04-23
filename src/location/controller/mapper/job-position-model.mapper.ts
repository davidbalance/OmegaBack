import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { JobPositionResponseDto } from "../dto/response/job_position.dto";

export class JobPositionModelMapper {
    public static toDTO(value: JobPositionModel): JobPositionResponseDto {
        return {
            jobPositionId: value.jobPositionId,
            jobPositionName: value.jobPositionName
        }
    }
}