import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, IsIn, IsInt } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export interface PageMeta {
    page: number;
    take: number;
}

export interface OrderMeta {
    field: string;
    order: 'asc' | 'desc'
}

export interface SearchMeta {
    search: string;
}

export class PageResponseDto {
    @Expose() public readonly pages: number;
}

export class CountMetaDto implements Partial<SearchMeta>, Omit<PageMeta, 'page'> {
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    public readonly take: number;

    @ApiPropertyOptional({ default: undefined })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly search?: string;
}

export class FilterMetaDto implements PageMeta, Partial<OrderMeta>, Partial<SearchMeta> {
    @Type(() => Number)
    @IsInt()
    @Min(0)
    public readonly page: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    public readonly take: number;

    @ApiPropertyOptional({ default: undefined })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly field?: string;

    @ApiPropertyOptional({ default: 'asc' })
    @IsString()
    @IsIn(['asc', 'desc'])
    @IsOptional()
    public readonly order?: "asc" | "desc";

    @ApiPropertyOptional({ default: undefined })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly search?: string;
}