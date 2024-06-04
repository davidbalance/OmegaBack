import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsArray } from "class-validator";

export enum FileSourceEnum {
    REPORT = 'report',
    RESULT = 'result'
}

export class FileSourceRequestDTO {
    @IsEnum(FileSourceEnum)
    public type: FileSourceEnum;

    @IsNumber()
    public id: number;
}

export class DownloadAndZipContentRequestDTO {
    @IsArray()
    @Type(() => FileSourceRequestDTO)
    public files: FileSourceRequestDTO[]
}
