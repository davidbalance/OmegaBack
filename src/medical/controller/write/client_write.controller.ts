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
import { ClientAddRecordCommand } from "@omega/medical/application/commands/client/client-add-record.command";
import { InitialRecordRequestDto } from "../dto/request/record/initial-record.dto";
import { PeriodicRecordRequestDto } from "../dto/request/record/periodic-record.dto";
import { ReintegrateRecordRequestDto } from "../dto/request/record/reintegrate-record.dto";
import { RetirementRecordRequestDto } from "../dto/request/record/retirement-record.dto";
import { CertficateRecordRequestDto } from "../dto/request/record/certificate-record.dto";

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
        @InjectCommand('ClientAddRecord') private readonly addRecordCommand: ClientAddRecordCommand,
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


    @Post(':patientDni/record/initial')
    async addRecordInitial(
        @Param('patientDni') patientDni: string,
        @Body() body: InitialRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({ type: 'inicial', patientDni, ...body });
        return "ok";
    }

    @Post(':patientDni/record/periodic')
    async addRecordPeriodic(
        @Param('patientDni') patientDni: string,
        @Body() body: PeriodicRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({ type: 'periodico', patientDni, ...body });
        return "ok";
    }

    @Post(':patientDni/record/reintegrate')
    async addRecordReintegrate(
        @Param('patientDni') patientDni: string,
        @Body() body: ReintegrateRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({ type: 'reintegrar', patientDni, ...body });
        return "ok";
    }

    @Post(':patientDni/record/retirement')
    async addRecordRetirement(
        @Param('patientDni') patientDni: string,
        @Body() body: RetirementRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({ type: 'retiro', patientDni, ...body });
        return "ok";
    }

    @Post(':patientDni/record/certificate')
    async addRecordCertificate(
        @Param('patientDni') patientDni: string,
        @Body() body: CertficateRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({ type: 'certificado', patientDni, ...body });
        return "ok";
    }
}