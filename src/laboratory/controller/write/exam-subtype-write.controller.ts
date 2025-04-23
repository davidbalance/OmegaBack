import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectCommand } from "@omega/laboratory/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { ExamSubtypeEditCommand } from "@omega/laboratory/application/command/exam/exam-subtype-edit.command";
import { ExamSubtypeRemoveCommand } from "@omega/laboratory/application/command/exam/exam-subtype-remove.command";
import { ExamSubtypeCreateRequestDto, ExamSubtypeEditRequestDto, ExamSubtypeMoveRequestDto } from "../dto/request/exam-subtype.dto";
import { ExamSubtypeCreateCommand } from "@omega/laboratory/application/command/exam/exam-subtype-create.command";
import { ExamSubtypeMoveCommand } from "@omega/laboratory/application/command/exam/exam-subtype-move.command";

@ApiTags('Laboratory', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('exam-subtype/write')
export class ExamSubtypeWriteController {
    constructor(
        @InjectCommand('ExamSubtypeCreate') private readonly createCommand: ExamSubtypeCreateCommand,
        @InjectCommand('ExamSubtypeEdit') private readonly editCommand: ExamSubtypeEditCommand,
        @InjectCommand('ExamSubtypeRemove') private readonly removeCommand: ExamSubtypeRemoveCommand,
        @InjectCommand('ExamSubtypeMove') private readonly moveCommand: ExamSubtypeMoveCommand,
    ) { }

    @Post()
    async create(
        @Body() body: ExamSubtypeCreateRequestDto
    ): Promise<string> {
        await this.createCommand.handleAsync({ ...body });
        return "ok";
    }

    @Put(':typeId/:subtypeId')
    async edit(
        @Param('typeId') typeId: string,
        @Param('subtypeId') subtypeId: string,
        @Body() body: ExamSubtypeEditRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({
            ...body,
            typeId, subtypeId
        });
        return "ok";
    }

    @Put(':typeId/:subtypeId/move')
    async move(
        @Param('typeId') typeId: string,
        @Param('subtypeId') subtypeId: string,
        @Body() body: ExamSubtypeMoveRequestDto
    ): Promise<string> {
        await this.moveCommand.handleAsync({
            ...body,
            fromTypeId: typeId,
            subtypeId: subtypeId,
        });
        return "ok";
    }

    @Delete(':typeId/:subtypeId')
    async remove(
        @Param('typeId') typeId: string,
        @Param('subtypeId') subtypeId: string
    ): Promise<string> {
        await this.removeCommand.handleAsync({ typeId, subtypeId });
        return "ok";
    }
}