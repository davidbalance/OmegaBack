import { Expose, Type } from "class-transformer";

export class CreateApiKeyResponseDTO {
    @Expose()
    public readonly apikey: string;
}

export class FindApiKeyResponseDTO {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
}

export class FindOneAndDeleteApiKeyResponseDTO { }

export class FindApiKeysResponseDTO {
    @Expose()
    @Type(() => FindApiKeyResponseDTO)
    public readonly apiKeys: FindApiKeyResponseDTO[];
}