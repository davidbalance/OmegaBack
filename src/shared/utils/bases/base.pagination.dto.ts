import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional } from "class-validator";
import { PaginationOrderEnum } from "./base.pagination";

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