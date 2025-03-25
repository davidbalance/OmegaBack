import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectCommand } from "@omega/location/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { CorporativeCreateRequestDto } from "../dto/request/corporative.dto";
import { CompanyCreateCommand } from "@omega/location/application/command/corporative/company-create.command";
import { CompanyMoveCommand } from "@omega/location/application/command/corporative/company-move.command";
import { CompanyRemoveCommand } from "@omega/location/application/command/corporative/company-remove.command";
import { CompanyCreateRequestDto, CompanyMoveRequestDto } from "../dto/request/company.dto";

@ApiTags('Location', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('company/write')
export class CompanyWriteController {
    constructor(
        @InjectCommand('CompanyCreate') private readonly companyCreateCommand: CompanyCreateCommand,
        @InjectCommand('CompanyMove') private readonly companyMoveCommand: CompanyMoveCommand,
        @InjectCommand('CompanyRemove') private readonly companyRemoveCommand: CompanyRemoveCommand,
    ) { }

    @Post()
    async createCompany(
        @Body() body: CompanyCreateRequestDto
    ): Promise<string> {
        await this.companyCreateCommand.handleAsync(body);
        return 'ok';
    }

    @Put(':corporativeId/:companyId')
    async moveCompany(
        @Param('corporativeId') corporativeId: string,
        @Param('companyId') companyId: string,
        @Body() body: CompanyMoveRequestDto
    ): Promise<string> {
        await this.companyMoveCommand.handleAsync({ ...body, fromCorporativeId: corporativeId, companyId });
        return 'ok';
    }

    @Delete(':corporativeId/:companyId')
    async removeCompany(
        @Param('corporativeId') corporativeId: string,
        @Param('companyId') companyId: string,
    ): Promise<string> {
        await this.companyRemoveCommand.handleAsync({ corporativeId, companyId });
        return 'ok';
    }
}