import { IsNotEmpty, IsString } from "class-validator";
import { JobPositionRequestDto } from "./base.job-position.request.dto";

export class PostJobPositionRequestDto extends JobPositionRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}