import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectCommand } from "@omega/medical/nest/inject/command.inject";
import { ClientAddAreaCommand } from "@omega/medical/application/commands/client/client-add-area.command";
import { ClientAddJobPositionCommand } from "@omega/medical/application/commands/client/client-add-job-position.command";
import { ClientAddManagementCommand } from "@omega/medical/application/commands/client/client-add-management.command";
import { ClientCreateCommand } from "@omega/medical/application/commands/client/client-create.command";
import { ClientAddAreaRequestDto, ClientAddJobPositionRequestDto, ClientAddManagementRequestDto, ClientCreateRequestDto, ClientEmailCreateRequestDto } from "../dto/request/client.dto";
import { EmailCreateCommand } from "@omega/medical/application/commands/client/email-create.command";
import { EmailDefaultCommand } from "@omega/medical/application/commands/client/email-default.command";
import { EmailRemoveCommand } from "@omega/medical/application/commands/client/email-remove.command";

@ApiTags('Medical', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-client/write')
export class ClientWriteController {
    constructor(
        @InjectCommand('ClientAddArea') private readonly addAreaCommand: ClientAddAreaCommand,
        @InjectCommand('ClientAddJobPosition') private readonly addJobPositionCommand: ClientAddJobPositionCommand,
        @InjectCommand('ClientAddManagement') private readonly addManagementCommand: ClientAddManagementCommand,
        @InjectCommand('ClientCreate') private readonly createCommand: ClientCreateCommand,
        @InjectCommand('EmailCreate') private readonly emailCreateCommand: EmailCreateCommand,
        @InjectCommand('EmailDefault') private readonly emailDefaultCommand: EmailDefaultCommand,
        @InjectCommand('EmailRemove') private readonly emailRemoveCommand: EmailRemoveCommand,
    ) { }

    @Post()
    async create(
        @Body() body: ClientCreateRequestDto
    ): Promise<string> {
        await this.createCommand.handleAsync(body);
        return "ok";
    }

    @Put(':dni/area')
    async addArea(
        @Param('dni') dni: string,
        @Body() body: ClientAddAreaRequestDto
    ): Promise<string> {
        await this.addAreaCommand.handleAsync({
            ...body,
            patientDni: dni
        });
        return "ok";
    }

    @Put(':dni/job-position')
    async addJobPosition(
        @Param('dni') dni: string,
        @Body() body: ClientAddJobPositionRequestDto
    ): Promise<string> {
        await this.addJobPositionCommand.handleAsync({
            ...body,
            patientDni: dni
        });
        return "ok";
    }

    @Put(':dni/management')
    async addManagement(
        @Param('dni') dni: string,
        @Body() body: ClientAddManagementRequestDto
    ): Promise<string> {
        await this.addManagementCommand.handleAsync({
            ...body,
            patientDni: dni
        });
        return "ok";
    }

    @Post('email')
    async createEmail(
        @Body() body: ClientEmailCreateRequestDto
    ): Promise<string> {
        await this.emailCreateCommand.handleAsync({ ...body });
        return "ok";
    }

    @Put(':patientDni/email/:emailId')
    async defaultEmail(
        @Param('patientDni') patientDni: string,
        @Param('emailId') emailId: string,
    ): Promise<string> {
        await this.emailDefaultCommand.handleAsync({ patientDni, emailId });
        return "ok";
    }

    @Delete(':patientDni/email/:emailId')
    async deleteEmail(
        @Param('patientDni') patientDni: string,
        @Param('emailId') emailId: string,
    ): Promise<string> {
        await this.emailRemoveCommand.handleAsync({ patientDni, emailId });
        return "ok";
    }
}