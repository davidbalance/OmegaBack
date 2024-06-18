import { Expose, Type } from "class-transformer";

export class GETApiKeyResponseDTO {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
}

export class GETApiKeyArrayResponseDTO {
    @Expose()
    @Type(() => GETApiKeyResponseDTO)
    public readonly apiKeys: GETApiKeyResponseDTO[];
}

export class POSTApiKeyResponseDTO extends GETApiKeyResponseDTO {
    @Expose()
    public readonly apikey: string;
}

export class PATCHApiKeyResponseDTO extends GETApiKeyResponseDTO { }

export class DELETEApiKeyResponseDTO { }