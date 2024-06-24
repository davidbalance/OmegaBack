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