import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDiseaseGroupRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class FindOneDiseaseGroupAndUpdateRequestDTO extends PartialType(CreateDiseaseGroupRequestDTO) { }