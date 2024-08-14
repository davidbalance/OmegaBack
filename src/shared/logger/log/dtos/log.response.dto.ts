import { Expose, Type } from "class-transformer";

export class FindLog {
    @Expose()
    public level: string;
    @Expose()
    public message: string;
    @Expose()
    public timestamp: Date;
}


export class GetLogsResponseDto {
    @Type(() => FindLog)
    @Expose()
    public logs: FindLog[];
}

export class GetLogLevelResponseDto {
    @Expose()
    public level: string;
}

export class GetLogLevelArrayResponseDto {
    @Type(() => GetLogLevelResponseDto)
    @Expose()
    public levels: GetLogLevelResponseDto[];
}