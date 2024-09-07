import { IsString, IsNotEmpty } from "class-validator";

export class UserAttributeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly value: string;
}