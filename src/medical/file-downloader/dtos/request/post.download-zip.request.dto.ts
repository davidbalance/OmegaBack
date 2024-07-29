import { Type } from "class-transformer";
import { IsArray } from "class-validator";
import { FileSourceRequestDto } from "./base.file-source.request.dto";

export class PostDownloadZipRequestDto {
    @IsArray()
    @Type(() => FileSourceRequestDto)
    public files: FileSourceRequestDto[]
}
