import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CorporativeCreateCommand } from "@omega/location/application/command/corporative/corporative-create.command";
import { CorporativeRemoveCommand } from "@omega/location/application/command/corporative/corporative-remove.command";
import { InjectCommand } from "@omega/location/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { CorporativeCreateRequestDto } from "../dto/request/corporative.dto";

@ApiTags('Location', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('corporative/write')
export class CorporativeWriteController {
    constructor(
        @InjectCommand('CorporativeCreate') private readonly corporativeCreateCommand: CorporativeCreateCommand,
        @InjectCommand('CorporativeRemove') private readonly corporativeRemoveCommand: CorporativeRemoveCommand
    ) { }

    @Post()
    async createCorporative(
        @Body() body: CorporativeCreateRequestDto
    ): Promise<string> {
        await this.corporativeCreateCommand.handleAsync(body);
        return 'ok';
    }

    @Delete(':corporativeId')
    async removeCorporative(
        @Param('corporativeId') corporativeId: string
    ): Promise<string> {
        await this.corporativeRemoveCommand.handleAsync({ corporativeId });
        return 'ok';
    }
}