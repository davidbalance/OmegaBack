import { IsNotEmpty, IsString } from "class-validator";
import { JobPositionResponseDto } from "./job-position.dto";

export class POSTJobPositionRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class POSTJobPositionResponseDto extends JobPositionResponseDto { }