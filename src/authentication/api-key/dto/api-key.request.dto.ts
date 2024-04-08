import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateApiKeyRequestDTO {
    @IsNumber()
    @IsNotEmpty()
    public readonly user: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}