import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleRequestDTO {
    @IsString()
    @IsNotEmpty()
    public name: string;
    
    @IsArray()
    @IsNotEmpty()
    public resources: number[];
}

export class FindOneRoleAndUpdateRequestDTO extends PartialType(CreateRoleRequestDTO) { }