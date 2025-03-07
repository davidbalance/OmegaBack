import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ManagementCreateCommand } from "@omega/location/application/command/management/management-create.command";
import { ManagementEditCommand } from "@omega/location/application/command/management/management-edit.command";
import { ManagementRemoveCommand } from "@omega/location/application/command/management/management-remove.command";
import { InjectCommand } from "@omega/location/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { ManagementCreateRequestDto, ManagementEditRequestDto } from "../dto/request/management.dto";

@ApiTags('Location', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('management/write')
export class ManagementWriteController {
    constructor(
        @InjectCommand('ManagementCreate') private readonly createCommand: ManagementCreateCommand,
        @InjectCommand('ManagementEdit') private readonly editCommand: ManagementEditCommand,
        @InjectCommand('ManagementRemove') private readonly removeCommand: ManagementRemoveCommand,
    ) { }

    @Post()
    async create(
        @Body() body: ManagementCreateRequestDto
    ): Promise<string> {
        await this.createCommand.handleAsync({ ...body });
        return "ok";
    }

    @Put(':managementId')
    async edit(
        @Param('managementId') managementId: string,
        @Body() body: ManagementEditRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({
            ...body,
            managementId
        });
        return "ok";
    }

    @Delete(':managementId')
    async remove(
        @Param('managementId') managementId: string
    ): Promise<string> {
        await this.removeCommand.handleAsync({ managementId });
        return "ok";
    }
}