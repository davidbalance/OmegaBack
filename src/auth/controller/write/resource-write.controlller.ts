import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectCommand } from "@omega/auth/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { ResourceCreateCommand } from "@omega/auth/application/command/resource/resource-create.command";
import { ResourceEditCommand } from "@omega/auth/application/command/resource/resource-edit.command";
import { ResourceRemoveCommand } from "@omega/auth/application/command/resource/resource-remove.command";
import { ResourceCreateRequestDto, ResourceEditRequestDto } from "../dto/request/resource.dto";

@ApiTags('Auth', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('resource/write')
export class ResourceWriteController {
    constructor(
        @InjectCommand('ResourceCreate') private readonly resourceCreateCommand: ResourceCreateCommand,
        @InjectCommand('ResourceEdit') private readonly resourceEditCommand: ResourceEditCommand,
        @InjectCommand('ResourceRemove') private readonly resourceRemoveCommand: ResourceRemoveCommand,
    ) { }

    @Post()
    async addResource(
        @Body() body: ResourceCreateRequestDto
    ): Promise<string> {
        await this.resourceCreateCommand.handleAsync(body);
        return "ok";
    }

    @Patch(':resourceId')
    async editResource(
        @Param('resourceId') resourceId: string,
        @Body() body: ResourceEditRequestDto,
    ): Promise<string> {
        await this.resourceEditCommand.handleAsync({
            ...body,
            resourceId
        });
        return "ok";
    }

    @Delete(':resourceId')
    async removeResource(
        @Param('resourceId') resourceId: string,
    ): Promise<string> {
        await this.resourceRemoveCommand.handleAsync({ resourceId });
        return "ok";
    }
}