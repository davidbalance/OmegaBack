import { Expose } from "class-transformer";

export class CreateApiKeyResponseDTO {
    @Expose()
    public readonly apikey: string;
}