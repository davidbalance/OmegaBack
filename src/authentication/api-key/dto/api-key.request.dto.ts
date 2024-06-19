import { IsNotEmpty, IsString } from "class-validator";

export class POSTApiKeyRequestDto {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHApiKeyRequestDto extends POSTApiKeyRequestDto { }