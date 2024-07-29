import { IsNotEmpty, IsString } from "class-validator";
import { ManagementResponseDto } from "./management.dto";

export class PATCHManagementRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHManagementResponseDto extends ManagementResponseDto { }