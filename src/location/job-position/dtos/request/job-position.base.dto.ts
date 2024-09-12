import { IsNotEmpty, IsString } from "class-validator";

export class JobPositionRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}