import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDiseaseGroupRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class FindOneDiseaseGroupAndUpdateRequestDTO {
    @IsString()
    @IsOptional()
    public readonly name?: string;
}