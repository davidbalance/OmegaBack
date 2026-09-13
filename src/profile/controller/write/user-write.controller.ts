import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserCreateCommand } from "@omega/profile/application/command/user/user-create.command";
import { InjectCommand } from "@omega/profile/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { UserAddAuthRequestDto, UserAddResourcesRequestDto, UserCreateRequestDto, UserEditRequestDto } from "../dto/request/user.dto";
import { UserAddAttributeCommand } from "@omega/profile/application/command/user/user-add-attribute.command";
import { AddCompanyFilterRequestDto, AddCorporativeFilterRequestDto, UserAddAttributeRequestDto } from "../dto/request/user-attribute.dto";
import { UserRemoveAttributeCommand } from "@omega/profile/application/command/user/user-remove-attribute.command";
import { UserRemoveCommand } from "@omega/profile/application/command/user/user-remove.command";
import { UserAddAuthCommand } from "@omega/profile/application/command/user/user-add-auth.command";
import { UserAddResourcesCommand } from "@omega/profile/application/command/user/user-add-resources.command";
import { UserEditCommand } from "@omega/profile/application/command/user/user-edit.command";
import { UserEditByDniCommand } from "@omega/profile/application/command/user/user-edit-by-dni.command";
import { AddCompanyFilterCommand } from "@omega/profile/application/command/user/add-company-filter.command";
import { AddCorporativeFilterCommand } from "@omega/profile/application/command/user/add-corporative-filter.command";
import { RemoveCompanyFilterCommand } from "@omega/profile/application/command/user/remove-company-filter.command";
import { RemoveCorporativeFilterCommand } from "@omega/profile/application/command/user/remove-corporative-filter.command";

@ApiTags('Profile', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user/write')
export class UserWriteController {
    constructor(
        @InjectCommand('UserCreate') private readonly createCommand: UserCreateCommand,
        @InjectCommand('UserEdit') private readonly editCommand: UserEditCommand,
        @InjectCommand('UserEditByDni') private readonly editByDniCommand: UserEditByDniCommand,
        @InjectCommand('UserRemove') private readonly removeCommand: UserRemoveCommand,
        @InjectCommand('UserAddAuth') private readonly addAuthCommand: UserAddAuthCommand,
        @InjectCommand('UserAddResources') private readonly addResourcesCommand: UserAddResourcesCommand,
        @InjectCommand('UserAddAttribute') private readonly addAttributeCommand: UserAddAttributeCommand,
        @InjectCommand('UserRemoveAttribute') private readonly removeAttributeCommand: UserRemoveAttributeCommand,
        @InjectCommand('AddCompanyFilter') private readonly addCompanyFilterCommand: AddCompanyFilterCommand,
        @InjectCommand('AddCorporativeFilter') private readonly addCorporativeFilterCommand: AddCorporativeFilterCommand,
        @InjectCommand('RemoveCompanyFilter') private readonly removeCompanyFilterCommand: RemoveCompanyFilterCommand,
        @InjectCommand('RemoveCorporativeFilter') private readonly removeCorporativeFilterCommand: RemoveCorporativeFilterCommand,
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

    @Put(':userDni/dni')
    async editUserDyDni(
        @Param('userDni') userDni: string,
        @Body() body: UserEditRequestDto
    ): Promise<string> {
        await this.editByDniCommand.handleAsync({ userDni, ...body });
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

    @Post('company-filter')
    async addCompanyFilter(
        @Body() body: AddCompanyFilterRequestDto
    ): Promise<string> {
        await this.addCompanyFilterCommand.handleAsync({ ...body });
        return "ok";
    }

    @Post('corporative-filter')
    async addCorporativeFilter(
        @Body() body: AddCorporativeFilterRequestDto
    ): Promise<string> {
        await this.addCorporativeFilterCommand.handleAsync({ ...body });
        return "ok";
    }

    @Delete('company-filter/:userId/:filterId')
    async removeCompanyFilter(
        @Param('userId') userId: string,
        @Param('filterId') filterId: string,
    ): Promise<string> {
        await this.removeCompanyFilterCommand.handleAsync({ userId, filterId });
        return "ok";
    }

    @Delete('corporative-filter/:userId/:filterId')
    async removeCorporativeFilter(
        @Param('userId') userId: string,
        @Param('filterId') filterId: string,
    ): Promise<string> {
        await this.removeCorporativeFilterCommand.handleAsync({ userId, filterId });
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