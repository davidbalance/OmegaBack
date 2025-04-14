import { BadRequestException, Body, Controller, Delete, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectCommand } from "@omega/medical/nest/inject/command.inject";
import { DiseaseReportCreateCommand } from "@omega/medical/application/commands/test/disease-report-create.command";
import { DiseaseReportEditCommand } from "@omega/medical/application/commands/test/disease-report-edit.command";
import { DiseaseReportRemoveCommand } from "@omega/medical/application/commands/test/disease-report-remove.command";
import { ReportAddContentCommand } from "@omega/medical/application/commands/test/report-add-content.command";
import { ReportRemoveContentCommand } from "@omega/medical/application/commands/test/report-remove-content.command";
import { ResultRemoveFileCommand } from "@omega/medical/application/commands/test/result-remove-file.command";
import { ResultUploadBufferCommand } from "@omega/medical/application/commands/test/result-upload-buffer.command";
import { DiseaseReportCreateRequestDto, DiseaseReportEditRequestDto, ReportRequestDto, TestCreateRequestDto, TestEditExamRequestDto } from "../dto/request/test.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { TestEditExamCommand } from "@omega/medical/application/commands/test/test-edit-exam.command";
import { TestCreateCommand } from "@omega/medical/application/commands/test/test-create.command";
import { TestCheckCommand } from "@omega/medical/application/commands/test/test-check.command";
import { TestUncheckCommand } from "@omega/medical/application/commands/test/test-uncheck.command";
import { ReportUploadBufferCommand } from "@omega/medical/application/commands/test/report-upload-buffer.command";
import { TestCheckFileCommand } from "@omega/medical/application/commands/test/test-check-file.command";
import { TestRemoveCommand } from "@omega/medical/application/commands/test/test-remove.command";

@ApiTags('Medical', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-test/write')
export class TestWriteController {
    constructor(
        @InjectCommand('DiseaseReportCreate') private readonly diseaseReportCreateCommand: DiseaseReportCreateCommand,
        @InjectCommand('DiseaseReportEdit') private readonly diseaseReportEditCommand: DiseaseReportEditCommand,
        @InjectCommand('DiseaseReportRemove') private readonly diseaseReportRemoveCommand: DiseaseReportRemoveCommand,
        @InjectCommand('ReportAddContent') private readonly reportAddContentCommand: ReportAddContentCommand,
        @InjectCommand('ReportUploadBuffer') private readonly reportUploadFromStreamCommand: ReportUploadBufferCommand,
        @InjectCommand('ReportRemoveContent') private readonly reportRemoveContentCommand: ReportRemoveContentCommand,
        @InjectCommand('ResultRemoveFile') private readonly resultRemoveFileCommand: ResultRemoveFileCommand,
        @InjectCommand('ResultUploadBuffer') private readonly resultUploadFromStreamCommand: ResultUploadBufferCommand,
        @InjectCommand('TestCheckFile') private readonly testCheckFileCommand: TestCheckFileCommand,
        @InjectCommand('TestCreate') private readonly testCreateCommand: TestCreateCommand,
        @InjectCommand('TestCheck') private readonly testCheckCommand: TestCheckCommand,
        @InjectCommand('TestEditExam') private readonly testEditCommand: TestEditExamCommand,
        @InjectCommand('TestRemove') private readonly testRemoveCommand: TestRemoveCommand,
        @InjectCommand('TestUncheck') private readonly testUncheckCommand: TestUncheckCommand,
    ) { }

    @Post()
    async createTest(
        @Body() body: TestCreateRequestDto
    ): Promise<string> {
        await this.testCreateCommand.handleAsync(body);
        return "ok";
    }

    @Post("file/check")
    async checkTestFile(): Promise<string> {
        await this.testCheckFileCommand.handleAsync();
        return "ok";
    }

    @Put(':testId/check')
    async checkTest(
        @Param('testId') testId: string,
    ): Promise<string> {
        await this.testCheckCommand.handleAsync({ testId });
        return "ok";
    }

    @Put(':testId/uncheck')
    async uncheckTest(
        @Param('testId') testId: string,
    ): Promise<string> {
        await this.testUncheckCommand.handleAsync({ testId });
        return "ok";
    }

    @Delete(':testId/test')
    async removeTest(
        @Param('testId') testId: string,
    ): Promise<string> {
        await this.testRemoveCommand.handleAsync({ testId });
        return "ok";
    }

    @Post('disease')
    async addDisease(
        @Body() body: DiseaseReportCreateRequestDto
    ): Promise<string> {
        await this.diseaseReportCreateCommand.handleAsync(body);
        return "ok";
    }

    @Put(':testId/disease/:diseaseReportId')
    async editDisease(
        @Param('testId') testId: string,
        @Param('diseaseReportId') diseaseReportId: string,
        @Body() body: DiseaseReportEditRequestDto
    ): Promise<string> {
        await this.diseaseReportEditCommand.handleAsync({
            ...body,
            diseaseReportId,
            testId
        });
        return "ok";
    }

    @Delete(':testId/disease/:diseaseReportId')
    async removeDisease(
        @Param('testId') testId: string,
        @Param('diseaseReportId') diseaseReportId: string
    ): Promise<string> {
        await this.diseaseReportRemoveCommand.handleAsync({ diseaseId: diseaseReportId, testId });
        return "ok";
    }

    @Put(':testId/report')
    async addReportContent(
        @Param('testId') testId: string,
        @Body() body: ReportRequestDto
    ): Promise<string> {
        await this.reportAddContentCommand.handleAsync({
            ...body,
            testId
        });
        return "ok";
    }

    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @Post(':testId/report')
    async addReportFile(
        @Param('testId') testId: string,
        @UploadedFile() file: Express.Multer.File
    ): Promise<string> {
        if (!file) throw new BadRequestException('File not found on request.');
        await this.reportUploadFromStreamCommand.handleAsync({
            testId,
            buffer: file.buffer
        });
        return "ok";
    }

    @Delete(':testId/report')
    async removeRemoveContent(
        @Param('testId') testId: string
    ): Promise<string> {
        await this.reportRemoveContentCommand.handleAsync({
            testId,
        });
        return "ok";
    }

    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @Post(':testId/result')
    async addResultFile(
        @Param('testId') testId: string,
        @UploadedFile() file: Express.Multer.File
    ): Promise<string> {
        if (!file) throw new BadRequestException('File not found on request.');
        await this.resultUploadFromStreamCommand.handleAsync({
            testId,
            buffer: file.buffer
        });
        return "ok";
    }

    @Delete(':testId/result')
    async removeResultFile(
        @Param('testId') testId: string
    ): Promise<string> {
        await this.resultRemoveFileCommand.handleAsync({ testId });
        return "ok";
    }

    @Put(':testId/exam')
    async editTestExam(
        @Param('testId') testId: string,
        @Body() body: TestEditExamRequestDto,
    ): Promise<string> {
        await this.testEditCommand.handleAsync({ testId, ...body });
        return "ok";
    }
}