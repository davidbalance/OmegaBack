import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";

export class FindLog {
    @Expose() public level: string;
    @Expose() public message: string;
    @Expose() public timestamp: Date;
}

export class GetLogArrayResponseDto implements ObjectArrayResponse<FindLog> {
    @Type(() => FindLog)
    @Expose() public data: FindLog[];
}

export class GetLogLevelResponseDto {
    @Expose()
    public level: string;
}

export class GetLogLevelArrayResponseDto implements ObjectArrayResponse<GetLogLevelResponseDto> {
    @Type(() => GetLogLevelResponseDto)
    @Expose() public data: GetLogLevelResponseDto[];
}