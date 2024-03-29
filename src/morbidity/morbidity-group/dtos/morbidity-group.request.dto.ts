import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMorbidityGroupRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class FindOneMorbidityGroupAndUpdateRequestDTO extends PartialType(CreateMorbidityGroupRequestDTO) { }