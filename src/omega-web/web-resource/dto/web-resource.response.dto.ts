import { Expose, Type } from 'class-transformer';

export class GETWebResourceResponseDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly label: string;
}

export class GETWebResourceArrayResponseDto {
    @Type(() => GETWebResourceResponseDto)
    @Expose()
    public readonly resources: GETWebResourceResponseDto[];
}

export class GETFullWebResourceResponseDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
    @Expose()
    public readonly label: string;
    @Expose()
    public readonly address: string;
    @Expose()
    public readonly icon: string;
}

export class GETFullWebResourceArrayResponseDto {
    @Type(() => GETFullWebResourceResponseDto)
    @Expose()
    public readonly resources: GETFullWebResourceResponseDto[];
}

export class POSTWebResourceResponseDto extends GETFullWebResourceResponseDto { }
export class PATCHWebResourceResponseDto extends GETFullWebResourceResponseDto { }
export class DELETEWebResourceResponseDto { }