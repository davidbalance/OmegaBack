import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectCommand } from "@omega/disease/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { DiseaseGroupCreateCommand } from "@omega/disease/application/command/disease/disease-group-create.command";
import { DiseaseGroupEditCommand } from "@omega/disease/application/command/disease/disease-group-edit.command";
import { DiseaseGroupRemoveCommand } from "@omega/disease/application/command/disease/disease-group-remove.command";
import { DiseaseGroupCreateRequestDto, DiseaseGroupEditRequestDto } from "../dto/request/disease-group.dto";

@ApiTags('Disease', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('disease-group/write')
export class DiseaseGroupWriteController {
    constructor(
        @InjectCommand('DiseaseGroupCreate') private readonly createCommand: DiseaseGroupCreateCommand,
        @InjectCommand('DiseaseGroupEdit') private readonly editCommand: DiseaseGroupEditCommand,
        @InjectCommand('DiseaseGroupRemove') private readonly removeCommand: DiseaseGroupRemoveCommand,
    ) { }

    @Post()
    async create(
        @Body() body: DiseaseGroupCreateRequestDto
    ): Promise<string> {
        await this.createCommand.handleAsync(body);
        return "ok";
    }

    @Put(':groupId')
    async edit(
        @Param('groupId') groupId: string,
        @Body() body: DiseaseGroupEditRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({
            ...body,
            groupId: groupId
        });
        return "ok";
    }

    @Delete(':groupId')
    async remove(
        @Param('groupId') groupId: string
    ): Promise<string> {
        await this.removeCommand.handleAsync({
            groupId: groupId
        });
        return "ok";
    }
}