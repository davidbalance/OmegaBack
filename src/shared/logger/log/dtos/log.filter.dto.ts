import { CountMetaDto, FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LogFilterMeta extends FilterMetaDto {
    @ApiPropertyOptional({ default: undefined })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly level: string;

    @ApiPropertyOptional({ default: undefined })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    public readonly toDate?: number;

    @ApiPropertyOptional({ default: undefined })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    public readonly fromDate?: number;
}

export class LogCountMeta extends CountMetaDto {
    @ApiPropertyOptional({ default: undefined })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly level: string;

    @ApiPropertyOptional({ default: undefined })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    public readonly toDate?: number;

    @ApiPropertyOptional({ default: undefined })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    public readonly fromDate?: number;
}