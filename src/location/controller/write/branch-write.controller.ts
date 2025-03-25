import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectCommand } from "@omega/location/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { CorporativeCreateRequestDto } from "../dto/request/corporative.dto";
import { CompanyCreateCommand } from "@omega/location/application/command/corporative/company-create.command";
import { CompanyMoveCommand } from "@omega/location/application/command/corporative/company-move.command";
import { CompanyRemoveCommand } from "@omega/location/application/command/corporative/company-remove.command";
import { CompanyCreateRequestDto, CompanyMoveRequestDto } from "../dto/request/company.dto";
import { BranchCreateCommand } from "@omega/location/application/command/corporative/branch-create.command";
import { BranchMoveCommand } from "@omega/location/application/command/corporative/branch-move.command";
import { BranchRemoveCommand } from "@omega/location/application/command/corporative/branch-remove.command";
import { BranchCreateRequestDto, BranchMoveRequestDto } from "../dto/request/branch.dto";

@ApiTags('Location', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('branch/write')
export class BranchWriteController {
    constructor(
        @InjectCommand('BranchCreate') private readonly branchCreateCommand: BranchCreateCommand,
        @InjectCommand('BranchMove') private readonly branchMoveCommand: BranchMoveCommand,
        @InjectCommand('BranchRemove') private readonly branchRemoveCommand: BranchRemoveCommand,
    ) { }

    @Post()
    async createBranch(
        @Body() body: BranchCreateRequestDto
    ): Promise<string> {
        await this.branchCreateCommand.handleAsync(body);
        return 'ok';
    }

    @Put(':corporativeId/:companyId/:branchId')
    async moveBranch(
        @Param('corporativeId') corporativeId: string,
        @Param('companyId') companyId: string,
        @Param('branchId') branchId: string,
        @Body() body: BranchMoveRequestDto
    ): Promise<string> {
        await this.branchMoveCommand.handleAsync({ ...body, fromCorporativeId: corporativeId, fromCompanyId: companyId, branchId });
        return 'ok';
    }

    @Delete(':corporativeId/:companyId/:branchId')
    async removeBranch(
        @Param('corporativeId') corporativeId: string,
        @Param('companyId') companyId: string,
        @Param('branchId') branchId: string,
    ): Promise<string> {
        await this.branchRemoveCommand.handleAsync({ corporativeId, companyId, branchId });
        return 'ok';
    }
}