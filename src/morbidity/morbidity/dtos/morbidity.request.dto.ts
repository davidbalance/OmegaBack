import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMorbidityRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
    @IsNumber()
    public readonly group: number;
}

export class FindOneMorbidityAndUpdateRequestDTO extends PartialType(CreateMorbidityRequestDTO) { }