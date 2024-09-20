import { IsEnum, IsNumber } from "class-validator";

export enum FileSourceEnum {
    ORDER = 'order',
    REPORT = 'report',
    RESULT = 'result'
}

export class FileSourceRequestDto {
    @IsEnum(FileSourceEnum)
    public type: FileSourceEnum;

    @IsNumber()
    public id: number;
}