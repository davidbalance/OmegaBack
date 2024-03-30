import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDiseaseRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
    @IsNumber()
    public readonly group: number;
}

export class FindOneDiseaseAndUpdateRequestDTO extends PartialType(CreateDiseaseRequestDTO) { }