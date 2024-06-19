import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

class UserRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;

    @IsEmail()
    public readonly email: string;
}

export class POSTUserRequestDto extends UserRequestDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly dni: string;
}

export class PATCHUserRequestDto extends UserRequestDto { }

export class PATCHUserExtraAttributeRequestDto {
    @IsString()
    public readonly value: string;
}