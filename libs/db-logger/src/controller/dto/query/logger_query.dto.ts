import { ReadLoggerQueryPayload } from "@db-logger/db-logger/application/query/read_logger.query";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class LoggerQueryDto implements ReadLoggerQueryPayload {
    @IsOptional()
    @IsString()
    public readonly level?: string | undefined;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly skip: number;

    @Type(() => Number)
    @IsNumber()
    @Min(10)
    public readonly limit: number;
}