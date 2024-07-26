import { Expose } from "class-transformer";
import { ApiKeyResponseDto } from "./base.api-key.response.dto";

export class PostApiKeyResponseDto extends ApiKeyResponseDto {
    @Expose() public readonly apikey: string;
}