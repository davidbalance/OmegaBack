import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsObject, IsString, Length } from "class-validator";

export class CreateUserRequestDTO {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly dni: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;

    @IsEmail()
    public readonly email: string;
}

class CreateUserRequestDTOOmittedType extends OmitType(CreateUserRequestDTO, ['dni']) { }
export class FindOneUserAndUpdateRequestDTO extends PartialType(CreateUserRequestDTOOmittedType) { }

export class PATCHUserExtraAttributeRequestDTO {
    @IsString()
    public readonly value: string;
}