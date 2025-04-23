import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DiseaseCreateCommand } from "@omega/disease/application/command/disease/disease-create.command";
import { InjectCommand } from "@omega/disease/nest/inject/command.inject";
import { DiseaseCreateRequestDto, DiseaseEditRequestDto, DiseaseMoveToGroupRequestDto } from "../dto/request/disease.dto";
import { AuthGuard } from "@shared/shared/nest/guard";
import { DiseaseEditCommand } from "@omega/disease/application/command/disease/disease-edit.command";
import { DiseaseRemoveCommand } from "@omega/disease/application/command/disease/disease-remove.command";
import { DiseaseMoveToGroupCommand } from "@omega/disease/application/command/disease/disease-move-to-group.command";

@ApiTags('Disease', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('disease/write')
export class DiseaseWriteController {
    constructor(
        @InjectCommand('DiseaseCreate') private readonly createCommand: DiseaseCreateCommand,
        @InjectCommand('DiseaseEdit') private readonly editCommand: DiseaseEditCommand,
        @InjectCommand('DiseaseMoveToGroup') private readonly moveToGroupCommand: DiseaseMoveToGroupCommand,
        @InjectCommand('DiseaseRemove') private readonly removeCommand: DiseaseRemoveCommand,
    ) { }

    @Post()
    async create(
        @Body() body: DiseaseCreateRequestDto
    ): Promise<string> {
        await this.createCommand.handleAsync(body);
        return "ok";
    }

    @Put(':groupId/:diseaseId')
    async edit(
        @Param('groupId') groupId: string,
        @Param('diseaseId') diseaseId: string,
        @Body() body: DiseaseEditRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({
            ...body,
            groupId: groupId,
            diseaseId: diseaseId,
        });
        return "ok";
    }

    @Put(':groupId/:diseaseId/move')
    async moveToGroup(
        @Param('groupId') groupId: string,
        @Param('diseaseId') diseaseId: string,
        @Body() body: DiseaseMoveToGroupRequestDto
    ): Promise<string> {
        await this.moveToGroupCommand.handleAsync({
            ...body,
            fromGroupId: groupId,
            diseaseId: diseaseId
        });
        return "ok";
    }

    @Delete(':groupId/:diseaseId')
    async remove(
        @Param('groupId') groupId: string,
        @Param('diseaseId') diseaseId: string,
    ): Promise<string> {
        await this.removeCommand.handleAsync({
            groupId: groupId,
            diseaseId: diseaseId,
        });
        return "ok";
    }
}