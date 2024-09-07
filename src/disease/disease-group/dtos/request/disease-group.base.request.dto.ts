import { IsNotEmpty, IsString } from "class-validator";

export class BaseDiseaseGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}