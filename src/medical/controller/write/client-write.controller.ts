import { Body, Controller, Delete, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectCommand } from "@omega/medical/nest/inject/command.inject";
import { ClientAddAreaCommand } from "@omega/medical/application/commands/client/client-add-area.command";
import { ClientAddJobPositionCommand } from "@omega/medical/application/commands/client/client-add-job-position.command";
import { ClientAddManagementCommand } from "@omega/medical/application/commands/client/client-add-management.command";
import { ClientCreateCommand } from "@omega/medical/application/commands/client/client-create.command";
import { ClientAddAreaRequestDto, ClientAddJobPositionRequestDto, ClientAddManagementRequestDto, ClientChangeRoleRequestDto, ClientCreateRequestDto, ClientEmailCreateRequestDto } from "../dto/request/client.dto";
import { EmailCreateCommand } from "@omega/medical/application/commands/client/email-create.command";
import { EmailDefaultCommand } from "@omega/medical/application/commands/client/email-default.command";
import { EmailRemoveCommand } from "@omega/medical/application/commands/client/email-remove.command";
import { ClientAddRecordCommand } from "@omega/medical/application/commands/client/client-add-record.command";
import { InitialRecordRequestDto } from "../dto/request/record/initial-record.dto";
import { PeriodicRecordRequestDto } from "../dto/request/record/periodic-record.dto";
import { ReintegrateRecordRequestDto } from "../dto/request/record/reintegrate-record.dto";
import { RetirementRecordRequestDto } from "../dto/request/record/retirement-record.dto";
import { CertficateRecordRequestDto } from "../dto/request/record/certificate-record.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { ClientMassiveLoadSpreadSheetMapper } from "../mapper/client-massive-load.spreadsheet-mapper";
import { ClientMassiveLoadSpreadSheetValidator } from "../validator/client-massive-load.spreadsheet-validator";
import { ClientCreateManyCommand } from "@omega/medical/application/commands/client/client-create-many.command";
import { ClientEditCommand } from "@omega/medical/application/commands/client/client-edit.command";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { AuthPayload } from "@shared/shared/providers/auth.provider";

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
        @InjectCommand('ClientEdit') private readonly editCommand: ClientEditCommand,
        @InjectCommand('EmailCreate') private readonly emailCreateCommand: EmailCreateCommand,
        @InjectCommand('EmailDefault') private readonly emailDefaultCommand: EmailDefaultCommand,
        @InjectCommand('EmailRemove') private readonly emailRemoveCommand: EmailRemoveCommand,
        @InjectCommand('ClientAddRecord') private readonly addRecordCommand: ClientAddRecordCommand,
        @InjectCommand('ClientCreateMany') private readonly createManyCommand: ClientCreateManyCommand,
        @InjectSpreadSheet() private readonly spreadsheet: SpreadsheetProvider
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

    @Put(':dni/role')
    async addRole(
        @Param('dni') dni: string,
        @Body() body: ClientChangeRoleRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({
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
        @CurrentUser() user: AuthPayload,
        @Param('patientDni') patientDni: string,
        @Body() body: InitialRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({
            ...body,
            type: 'inicial',
            patientDni,
            authorFullname: body.authorFullname ?? `${user.name} ${user.lastname}`,
            authorDni: body.authorDni ?? user.dni,
        });
        return "ok";
    }

    @Post(':patientDni/record/periodic')
    async addRecordPeriodic(
        @CurrentUser() user: AuthPayload,
        @Param('patientDni') patientDni: string,
        @Body() body: PeriodicRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({
            ...body,
            type: 'periodico',
            patientDni,
            authorFullname: body.authorFullname ?? `${user.name} ${user.lastname}`,
            authorDni: body.authorDni ?? user.dni,
        });
        return "ok";
    }

    @Post(':patientDni/record/reintegrate')
    async addRecordReintegrate(
        @CurrentUser() user: AuthPayload,
        @Param('patientDni') patientDni: string,
        @Body() body: ReintegrateRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({
            ...body,
            type: 'reintegrar',
            patientDni,
            authorFullname: body.authorFullname ?? `${user.name} ${user.lastname}`,
            authorDni: body.authorDni ?? user.dni,
        });
        return "ok";
    }

    @Post(':patientDni/record/retirement')
    async addRecordRetirement(
        @CurrentUser() user: AuthPayload,
        @Param('patientDni') patientDni: string,
        @Body() body: RetirementRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({
            ...body,
            type: 'retiro',
            patientDni,
            authorFullname: body.authorFullname ?? `${user.name} ${user.lastname}`,
            authorDni: body.authorDni ?? user.dni,
        });
        return "ok";
    }

    @Post(':patientDni/record/certificate')
    async addRecordCertificate(
        @CurrentUser() user: AuthPayload,
        @Param('patientDni') patientDni: string,
        @Body() body: CertficateRecordRequestDto,
    ): Promise<string> {
        await this.addRecordCommand.handleAsync({
            ...body,
            type: 'certificado',
            patientDni,
            authorFullname: body.authorFullname ?? `${user.name} ${user.lastname}`,
            authorDni: body.authorDni ?? user.dni,
        });
        return "ok";
    }

    @Post('massive-load/excel')
    @UseInterceptors(FileInterceptor('file'))
    async massiveLoadFromExcel(
        @UploadedFile() file: Express.Multer.File
    ): Promise<string> {
        const data = await this.spreadsheet.read(file.buffer);
        const parsed = data.slice(1).map(e => ClientMassiveLoadSpreadSheetMapper.toDTO(e.slice(1)));
        const promises = parsed.map((async (e) => await ClientMassiveLoadSpreadSheetValidator.validate(e)));
        await Promise.all(promises);
        await this.createManyCommand.handleAsync({ data: parsed });
        return "ok";
    }
}