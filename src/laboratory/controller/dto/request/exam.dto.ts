import { ExamEditCommandPayload } from "@omega/laboratory/application/command/exam/exam-edit.command";
import { ExamMoveCommandPayload } from "@omega/laboratory/application/command/exam/exam-move.command";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ExamEditRequestDto implements Omit<ExamEditCommandPayload, 'typeId' | 'subtypeId' | 'examId'> {
    @IsString()
    @IsNotEmpty()
    public readonly examName: string;
}

export class ExamMoveRequestDto implements Omit<ExamMoveCommandPayload, 'fromTypeId' | 'fromSubtypeId' | 'examId'> {
    @IsUUID()
    public readonly toTypeId: string;

    @IsUUID()
    public readonly toSubtypeId: string;
}