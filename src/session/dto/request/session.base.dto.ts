import { IsNotEmpty, IsString } from "class-validator";

export class BaseSessionRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly token: string;

    @IsString()
    @IsNotEmpty()
    public readonly refresh: string;
}