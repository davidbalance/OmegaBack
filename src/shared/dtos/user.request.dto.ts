import { User } from "@/user/user/entities/user.entity";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserRequestDTO {
    @IsEmail()
    public readonly email: string;

    @IsString()
    @Length(10, 10)
    public readonly dni: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;
}

export class UpdateUserRequestDTO extends PartialType(
    OmitType(CreateUserRequestDTO, ['dni'])
) { }

export class UpdateUserDNIRequestDTO extends OmitType(CreateUserRequestDTO, ['email', 'name', 'lastname']) { }