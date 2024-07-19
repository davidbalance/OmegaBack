import { IsNotEmpty, IsString } from 'class-validator';
import { ExamTypeResponse } from './exam-type.dto';

export class PATCHExamTypeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHExamTypeResponseDto extends ExamTypeResponse { }
