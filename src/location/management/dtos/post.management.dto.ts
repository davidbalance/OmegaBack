import { IsNotEmpty, IsString } from "class-validator";
import { ManagementResponseDto } from "./management.dto";

export class POSTManagementRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class POSTManagementResponseDto extends ManagementResponseDto { }