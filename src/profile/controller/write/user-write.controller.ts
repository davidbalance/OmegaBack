import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserCreateCommand } from "@omega/profile/application/command/user/user-create.command";
import { InjectCommand } from "@omega/profile/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { UserAddAuthRequestDto, UserAddResourcesRequestDto, UserCreateRequestDto, UserEditRequestDto } from "../dto/request/user.dto";
import { UserAddAttributeCommand } from "@omega/profile/application/command/user/user-add-attribute.command";
import { UserAddAttributeRequestDto } from "../dto/request/user_attribute.dto";
import { UserRemoveAttributeCommand } from "@omega/profile/application/command/user/user-remove-attribute.command";
import { UserRemoveCommand } from "@omega/profile/application/command/user/user-remove.command";
import { UserAddAuthCommand } from "@omega/profile/application/command/user/user-add-auth.command";
import { UserAddResourcesCommand } from "@omega/profile/application/command/user/user-add-resources.command";
import { UserEditCommand } from "@omega/profile/application/command/user/user-edit.command";

@ApiTags('Profile', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user/write')
export class UserWriteController {
    constructor(
        @InjectCommand('UserCreate') private readonly createCommand: UserCreateCommand,
        @InjectCommand('UserEdit') private readonly editCommand: UserEditCommand,
        @InjectCommand('UserRemove') private readonly removeCommand: UserRemoveCommand,
        @InjectCommand('UserAddAuth') private readonly addAuthCommand: UserAddAuthCommand,
        @InjectCommand('UserAddResources') private readonly addResourcesCommand: UserAddResourcesCommand,
        @InjectCommand('UserAddAttribute') private readonly addAttributeCommand: UserAddAttributeCommand,
        @InjectCommand('UserRemoveAttribute') private readonly removeAttributeCommand: UserRemoveAttributeCommand,
    ) { }

    @Post()
    async createUser(
        @Body() body: UserCreateRequestDto
    ): Promise<string> {
        await this.createCommand.handleAsync({ ...body });
        return "ok";
    }

    @Put(':userId')
    async editUser(
        @Param('userId') userId: string,
        @Body() body: UserEditRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({ userId, ...body });
        return "ok";
    }

    @Delete(':userId')
    async removeUser(
        @Param('userId') userId: string,
    ): Promise<string> {
        await this.removeCommand.handleAsync({ userId });
        return "ok";
    }

    @Post('auth')
    async addAuth(
        @Body() body: UserAddAuthRequestDto
    ): Promise<string> {
        await this.addAuthCommand.handleAsync({ ...body });
        return "ok";
    }

    @Post('resources')
    async addResources(
        @Body() body: UserAddResourcesRequestDto
    ): Promise<string> {
        await this.addResourcesCommand.handleAsync({ ...body });
        return "ok";
    }

    @Post('attribute')
    async addAttribute(
        @Body() body: UserAddAttributeRequestDto
    ): Promise<string> {
        await this.addAttributeCommand.handleAsync({ ...body });
        return "ok";
    }

    @Delete(':userId/:attributeId')
    async removeAttribute(
        @Param('userId') userId: string,
        @Param('attributeId') attributeId: string,
    ): Promise<string> {
        await this.removeAttributeCommand.handleAsync({ userId, attributeId });
        return "ok";
    }
}