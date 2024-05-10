import { IsNotEmpty, IsString } from "class-validator";

export class CreateApiKeyRequestDTO {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class FindOneAndUpdateApiKeyRequestDTO {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}