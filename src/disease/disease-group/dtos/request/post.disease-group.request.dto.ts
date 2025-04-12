import { IsNotEmpty, IsString } from "class-validator";

export class PostDiseaseGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}