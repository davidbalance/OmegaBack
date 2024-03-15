import { IsString, Length, Max } from "class-validator";

export class CreateUserRequestDTO {
    @IsString()
    @Length(10, 10)
    public readonly dni: string;
    @IsString()
    @Max(64)
    public readonly name: string;
    @IsString()
    @Max(64)
    public readonly lastname: string;
}