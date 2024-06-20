import { Expose, Type } from "class-transformer";

export class GETUserResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly dni: string;

    @Expose()
    public readonly email: string;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly lastname: string;

    @Expose()
    public readonly hasCredential: boolean;
}

export class GETUserArrayResponseDto {
    @Type(() => GETUserResponseDto)
    @Expose()
    public readonly users: GETUserResponseDto[];
}

export class POSTUserResponseDto extends GETUserResponseDto { }

export class PATCHUserResponseDto extends GETUserResponseDto { }

export class DELETEUserResponseDto { }

export class GETAttributeResponseDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
    @Expose()
    public readonly value: string;
}

export class PATCHUserExtraAttributeResponseDto { }