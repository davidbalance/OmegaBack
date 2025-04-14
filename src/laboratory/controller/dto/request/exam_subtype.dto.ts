import { ExamSubtypeCreateCommandPayload } from "@omega/laboratory/application/command/exam/exam-subtype-create.command";
import { ExamSubtypeEditCommandPayload } from "@omega/laboratory/application/command/exam/exam-subtype-edit.command";
import { ExamSubtypeMoveCommandPayload } from "@omega/laboratory/application/command/exam/exam-subtype-move.command";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ExamSubtypeCreateRequestDto
    implements ExamSubtypeCreateCommandPayload {
    @IsUUID()
    public readonly typeId: string;

    @IsString()
    @IsNotEmpty()
    public readonly subtypeName: string;
}

export class ExamSubtypeEditRequestDto
    implements Omit<ExamSubtypeEditCommandPayload, 'typeId' | 'subtypeId'> {
    @IsString()
    @IsNotEmpty()
    public readonly subtypeName: string;
}

export class ExamSubtypeMoveRequestDto implements Omit<ExamSubtypeMoveCommandPayload, 'fromTypeId' | 'subtypeId'> {
    @IsUUID()
    public readonly toTypeId: string;
}