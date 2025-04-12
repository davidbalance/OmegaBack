import { PostExamSubtypeWithKeyRequestDto } from "@/laboratory/exam-subtype/dtos/request/post.exam-subtype-with-key.dto";
import { PostExamRequestDto } from "./post.exam.request.dto";
import { PostExamTypeWithKeyRequestDto } from "@/laboratory/exam-type/dtos/request/post.exam-type-with-key.dto";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested, IsOptional } from "class-validator";
import { OmitType } from "@nestjs/mapped-types";

export class PostExamExternalRequestDto extends OmitType(PostExamRequestDto, ['subtype']) {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostExamTypeWithKeyRequestDto)
    public readonly type: PostExamTypeWithKeyRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @IsOptional()
    @Type(() => PostExamSubtypeWithKeyRequestDto)
    public readonly subtype?: PostExamSubtypeWithKeyRequestDto;
}