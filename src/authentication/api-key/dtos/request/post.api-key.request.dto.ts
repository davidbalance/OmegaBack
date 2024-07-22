import { IsNotEmpty, IsString } from "class-validator";

export class PostApiKeyRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}