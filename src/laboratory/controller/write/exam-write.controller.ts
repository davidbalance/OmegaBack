import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExamEditCommand } from "@omega/laboratory/application/command/exam/exam-edit.command";
import { InjectCommand } from "@omega/laboratory/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { ExamEditRequestDto, ExamMoveRequestDto } from "../dto/request/exam.dto";
import { ExamMoveCommand } from "@omega/laboratory/application/command/exam/exam-move.command";

@ApiTags('Laboratory', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('exam/write')
export class ExamWriteController {
    constructor(
        @InjectCommand('ExamEdit') private readonly editCommand: ExamEditCommand,
        @InjectCommand('ExamMove') private readonly moveCommand: ExamMoveCommand,
    ) { }

    @Put(':typeId/:subtypeId/:examId')
    async edit(
        @Param('typeId') typeId: string,
        @Param('subtypeId') subtypeId: string,
        @Param('examId') examId: string,
        @Body() body: ExamEditRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({
            ...body,
            typeId, subtypeId, examId
        });
        return "ok";
    }

    @Put(':typeId/:subtypeId/:examId/move')
    async move(
        @Param('typeId') typeId: string,
        @Param('subtypeId') subtypeId: string,
        @Param('examId') examId: string,
        @Body() body: ExamMoveRequestDto
    ): Promise<string> {
        await this.moveCommand.handleAsync({
            ...body,
            examId: examId,
            fromSubtypeId: subtypeId,
            fromTypeId: typeId
        });
        return "ok";
    }
}