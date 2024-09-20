import { OmitType } from "@nestjs/mapped-types";
import { ExamRequestDto } from "./exam.base.dto";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested, IsOptional } from "class-validator";
import { ExternalExamTypeWithKeyRequestDto } from "@/laboratory/exam-type/dtos/request/external-exam-type-with-key.base.dto";
import { ExternalExamSubtypeWithKeyRequestDto } from "@/laboratory/exam-subtype/dtos/request/external-exam-subtype-with-key.base.dto";

export class ExamExternalRequestDto extends OmitType(ExamRequestDto, ['subtype']) {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @IsOptional()
    @Type(() => ExternalExamTypeWithKeyRequestDto)
    public readonly type?: ExternalExamTypeWithKeyRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @IsOptional()
    @Type(() => ExternalExamSubtypeWithKeyRequestDto)
    public readonly subtype?: ExternalExamSubtypeWithKeyRequestDto;
}