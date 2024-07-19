import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ExamSubtypeResponse } from "./exam-subtype.dto";

export class POSTExamSubtypeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsNumber()
    public readonly type: number;
}

export class POSTExamSubtypeResponseDto extends ExamSubtypeResponse { }