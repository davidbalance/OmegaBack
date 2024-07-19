import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { ExamTypeResponse } from "./exam-type.dto";

export class POSTExamTypeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class POSTExamTypeResponseDto extends ExamTypeResponse { }