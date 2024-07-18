import { IsOptional, IsString } from "class-validator";

export class PATCHDiseaseGroupRequestDto {
    @IsString()
    @IsOptional()
    public readonly name?: string;
}

export class PATCHDiseaseGroupResponseDto { }