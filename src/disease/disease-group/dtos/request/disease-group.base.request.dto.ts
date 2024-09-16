import { IsNotEmpty, IsString } from "class-validator";

export class DiseaseGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}