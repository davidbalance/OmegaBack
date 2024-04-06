import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateApiKeyRequestDTO {
    @IsNumber()
    @IsNotEmpty()
    public readonly user: number;
}