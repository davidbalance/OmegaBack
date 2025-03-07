import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AreaCreateCommand } from "@omega/location/application/command/area/area-create.command";
import { AreaEditCommand } from "@omega/location/application/command/area/area-edit.command";
import { AreaRemoveCommand } from "@omega/location/application/command/area/area-remove.command";
import { InjectCommand } from "@omega/location/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { AreaCreateRequestDto, AreaEditRequestDto } from "../dto/request/area.dto";

@ApiTags('Location', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('area/write')
export class AreaWriteController {
    constructor(
        @InjectCommand('AreaCreate') private readonly createCommand: AreaCreateCommand,
        @InjectCommand('AreaEdit') private readonly editCommand: AreaEditCommand,
        @InjectCommand('AreaRemove') private readonly removeCommand: AreaRemoveCommand,
    ) { }

    @Post()
    async create(
        @Body() body: AreaCreateRequestDto
    ): Promise<string> {
        await this.createCommand.handleAsync({ ...body });
        return "ok";
    }

    @Put(':areaId')
    async edit(
        @Param('areaId') areaId: string,
        @Body() body: AreaEditRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({
            ...body,
            areaId
        });
        return "ok";
    }

    @Delete(':areaId')
    async remove(
        @Param('areaId') areaId: string
    ): Promise<string> {
        await this.removeCommand.handleAsync({ areaId });
        return "ok";
    }
}