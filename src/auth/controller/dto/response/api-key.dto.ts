import { Expose } from "class-transformer";

export class ApiKeyResponseDto {
    @Expose() public readonly apiKeyId: string;
    @Expose() public readonly apiKeyName: string;
}