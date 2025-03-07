import { PaginationResponse } from "@shared/shared/nest/pagination_response";
import { Expose, Type } from "class-transformer";

export class LoggerResponseDto {
    @Expose() public readonly message: string;
    @Expose() public readonly level: string;
    @Expose() public readonly timestamp: Date;
}

export class LoggerManyResponseDto implements PaginationResponse<LoggerResponseDto> {
    @Type(() => LoggerResponseDto)
    @Expose() public readonly data: LoggerResponseDto[];
    @Expose() public readonly amount: number;
}

export class LoggerLevelResponseDto {
    @Expose() public readonly level: string;
}