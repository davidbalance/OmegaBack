import { Expose, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum PaginationOrderEnum {
    DESC = "DESC",
    ASC = "ASC"
}

export class PaginationResponse<T> {
    @Expose()
    public readonly pages: number;

    @Expose()
    @Type((options) => options.newObject.dataType)
    public readonly data: T[];

    private dataType: any;

    constructor(dataType: new () => T) {
        this.dataType = dataType;
    }
}

export class PaginationOrder {
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsEnum(PaginationOrderEnum)
    order: PaginationOrderEnum;
}

export class PaginationRequest {

    @IsNumber()
    public readonly page: number;

    @IsNumber()
    public readonly limit: number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    public readonly filter?: string;

    @IsEnum(PaginationOrder)
    @IsOptional()
    public readonly order?: PaginationOrder;
}

export interface IPagination<T> {
    findPaginatedDataAndPageCount(page: number, limit: number, filter?: string, order?: PaginationOrder): Promise<[value: number, data: T[]]> | [value: number, data: T[]];
    findPaginatedByFilter(page: number, limit: number, filter?: string, order?: PaginationOrder): Promise<T[]> | T[];
    findPageCount(limit: number, filter?: string): Promise<number> | number;
}