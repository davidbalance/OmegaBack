import { Expose, Type } from "class-transformer";

export class FindLog {
    @Expose()
    public level: string;
    @Expose()
    public message: string;
    @Expose()
    public timestamp: Date;
}


export class GETLogsResponseDto {
    @Type(() => FindLog)
    @Expose()
    public logs: FindLog[];
}

export class GETLogLevelResponseDto {
    @Expose()
    public level: string[];
}

export class GETLogLevelArrayResponseDto {
    @Type(() => GETLogLevelResponseDto)
    @Expose()
    public levels: GETLogLevelResponseDto[];
}