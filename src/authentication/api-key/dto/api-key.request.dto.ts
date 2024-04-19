import { IsNotEmpty, IsString } from "class-validator";

export class CreateApiKeyRequestDTO {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}