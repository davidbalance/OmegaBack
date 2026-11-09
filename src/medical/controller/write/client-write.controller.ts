import { BadRequestException, Body, Controller, Delete, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectCommand } from "@omega/medical/nest/inject/command.inject";
import { ClientAddAreaCommand } from "@omega/medical/application/commands/client/client-add-area.command";
import { ClientAddJobPositionCommand } from "@omega/medical/application/commands/client/client-add-job-position.command";
import { ClientAddManagementCommand } from "@omega/medical/application/commands/client/client-add-management.command";
import { ClientCreateCommand } from "@omega/medical/application/commands/client/client-create.command";
import { ClientAddAreaRequestDto, ClientAddJobPositionRequestDto, ClientAddManagementRequestDto, ClientChangeRoleRequestDto, ClientCreateRequestDto, ClientEmailCreateRequestDto, ClientUpdateNameRequestDto } from "../dto/request/client.dto";
import { EmailCreateCommand } from "@omega/medical/application/commands/client/email-create.command";
import { EmailDefaultCommand } from "@omega/medical/application/commands/client/email-default.command";
import { EmailRemoveCommand } from "@omega/medical/application/commands/client/email-remove.command";
import { ClientAddRecordCommand } from "@omega/medical/application/commands/client/client-add-record.command";
import { FileInterceptor } from "@nestjs/platform-express";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { ClientMassiveLoadSpreadSheetMapper } from "../mapper/client-massive-load.spreadsheet-mapper";
import { ClientMassiveLoadSpreadSheetValidator } from "../validator/client-massive-load.spreadsheet-validator";
import { ClientCreateManyCommand } from "@omega/medical/application/commands/client/client-create-many.command";
import { ClientEditCommand } from "@omega/medical/application/commands/client/client-edit.command";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { AuthPayload } from "@shared/shared/providers/auth.provider";
import { ClientUpdateRecordCommand } from "@omega/medical/application/commands/client/client-update-record.command";
import { RecordRequestDTO } from "../dto/request/record.dto";
import { ClientCompleteRecordCommand } from "@omega/medical/application/commands/client/client-complete-record.command";

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
        @InjectCommand('ClientUpdateRecord') private readonly updateRecordCommand: ClientUpdateRecordCommand,
        @InjectCommand('ClientCompleteRecord') private readonly completeRecordCommand: ClientCompleteRecordCommand,
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

    @Put(':dni/name')
    async updateName(
        @Param('dni') dni: string,
        @Body() body: ClientUpdateNameRequestDto
    ): Promise<string> {
        await this.editCommand.handleAsync({
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

    @Post(':patientDni/record/:recordType')
    async addRecord(
        @CurrentUser() user: AuthPayload,
        @Param('patientDni') patientDni: string,
        @Param('recordType') recordType: string,
        @Body() { metadata }: RecordRequestDTO,
    ): Promise<string> {
        if (!["certificado", "femo"].includes(recordType)) {
            throw new BadRequestException('Invalid record');
        }

        await this.addRecordCommand.handleAsync({
            patientDni,
            name: recordType,
            metadata: {
                ...metadata,
                professionalData: {
                    fullName: !!metadata?.author.fullname ? metadata?.author.fullname : `${user.name} ${user.lastname}`,
                    medicalCode: !!metadata?.author.dni ? metadata?.author.dni : user.dni,
                }
            }
        });
        return "ok";
    }

    @Put(':patientDni/record/:recordId')
    async updateRecord(
        @Param('patientDni') patientDni: string,
        @Param('recordId') recordId: string,
        @Body() { metadata }: RecordRequestDTO,
    ): Promise<string> {
        await this.updateRecordCommand.handleAsync({
            recordId: recordId,
            patientDni,
            metadata
        });
        return "ok";
    }

    @Put(':patientDni/complete/record/:recordType/:recordId')
    async completeRecord(
        @Param('patientDni') patientDni: string,
        @Param('recordType') recordType: string,
        @Param('recordId') recordId: string,
        @Body() { metadata }: RecordRequestDTO,
    ): Promise<string> {
        await this.completeRecordCommand.handleAsync({
            type: recordType,
            patientDni,
            recordId,
            metadata
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