import { PostExamSubtypeWithKeyRequestDto } from "@/laboratory/exam-subtype/dto/request/post.exam-subtype-with-key.dto";
import { PostExamRequestDto } from "./post.exam.request.dto";
import { PostExamTypeWithKeyRequestDto } from "@/laboratory/exam-type/dtos/request/post.exam-type-with-key.dto";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested } from "class-validator";

export class PostExamExternalRequestDto extends PostExamRequestDto {

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
    @Type(() => PostExamSubtypeWithKeyRequestDto)
    public readonly subtype?: PostExamSubtypeWithKeyRequestDto;
}