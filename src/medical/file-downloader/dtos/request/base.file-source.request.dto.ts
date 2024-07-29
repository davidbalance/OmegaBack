import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsArray } from "class-validator";

export enum FileSourceEnum {
    REPORT = 'report',
    RESULT = 'result'
}

export class FileSourceRequestDto {
    @IsEnum(FileSourceEnum)
    public type: FileSourceEnum;

    @IsNumber()
    public id: number;
}