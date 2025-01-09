import { IsNotEmpty, IsString } from "class-validator";

export class AreaRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}