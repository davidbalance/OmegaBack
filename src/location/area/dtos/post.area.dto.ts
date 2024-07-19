import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AreaResponseDto } from "./area.dto";

export class POSTAreaResponseDto extends AreaResponseDto { }

export class POSTAreaRequestDto {
    @IsNumber()
    public readonly management: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}