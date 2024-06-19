import { Expose, Type } from "class-transformer";

export class GETApiKeyResponseDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
}

export class GETApiKeyArrayResponseDto {
    @Expose()
    @Type(() => GETApiKeyResponseDto)
    public readonly apiKeys: GETApiKeyResponseDto[];
}

export class POSTApiKeyResponseDto extends GETApiKeyResponseDto {
    @Expose()
    public readonly apikey: string;
}

export class PATCHApiKeyResponseDto extends GETApiKeyResponseDto { }

export class DELETEApiKeyResponseDto { }