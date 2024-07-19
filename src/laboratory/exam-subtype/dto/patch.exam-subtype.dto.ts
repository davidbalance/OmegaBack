import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ExamSubtypeResponse } from "./exam-subtype.dto";

export class PATCHExamSubtypeRequestDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly name: string;

    @IsNumber()
    @IsOptional()
    public readonly type?: number;
}

export class PATCHExamSubtypeResponseDto extends ExamSubtypeResponse { }