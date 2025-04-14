import { UserAddAuthCommandPayload } from "@omega/profile/application/command/user/user-add-auth.command";
import { UserCreateCommandPayload } from "@omega/profile/application/command/user/user-create.command";
import { UserEditCommandPayload } from "@omega/profile/application/command/user/user-edit.command";
import { IsArray, IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";

export class UserCreateRequestDto implements UserCreateCommandPayload {
    @IsString()
    @IsNotEmpty()
    @Length(10)
    public readonly dni: string;

    @IsEmail()
    public readonly email: string;

    @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    public readonly password: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;

    @IsArray()
    @IsUUID(undefined, { each: true })
    public readonly resources: string[];

    @IsUUID()
    public readonly logo: string;
}

export class UserEditRequestDto implements Omit<UserEditCommandPayload, 'userId'> {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;
}

export class UserAddResourcesRequestDto implements UserAddResourcesRequestDto {
    @IsUUID()
    public readonly userId: string;

    @IsArray()
    @IsUUID(undefined, { each: true })
    public readonly resources: string[];
}

export class UserAddAuthRequestDto implements UserAddAuthCommandPayload {
    @IsUUID()
    public readonly userId: string;

    @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    public readonly password: string;

    @IsArray()
    @IsUUID(undefined, { each: true })
    public readonly resources: string[];
}