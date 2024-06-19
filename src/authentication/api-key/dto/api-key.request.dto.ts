import { IsNotEmpty, IsString } from "class-validator";

export class POSTApiKeyRequestDTO {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHApiKeyRequestDTO extends POSTApiKeyRequestDTO { }