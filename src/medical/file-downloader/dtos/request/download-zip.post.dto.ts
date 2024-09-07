import { Type } from "class-transformer";
import { IsArray } from "class-validator";
import { FileSourceRequestDto } from "./file-source.base.dto";

export class PostDownloadZipRequestDto {
    @IsArray()
    @Type(() => FileSourceRequestDto)
    public files: FileSourceRequestDto[]
}
