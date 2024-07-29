import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AreaResponseDto } from "./area.dto";

export class PATCHAreaResponseDto extends AreaResponseDto { }

export class PATCHAreaRequestDto {
    @IsNumber()
    public readonly management: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}