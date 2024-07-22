import { Expose } from "class-transformer";

export class PostApiKeyResponseDto {
    @Expose() public readonly apikey: string;
}