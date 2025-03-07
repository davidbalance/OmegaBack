import { Body, Controller, Get, Param, Post, Res, StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReportGetFileQuery } from "@omega/medical/application/queries/test/report-get-file.query";
import { ResultGetFileQuery } from "@omega/medical/application/queries/test/result-get-file.query";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { Response } from "express";
import { TestZipRequestDto } from "../dto/request/test.dto";
import { TestGetZipQuery } from "@omega/medical/application/queries/test/test-get-zip.query";

@ApiTags('Medical', 'Read')
@Controller('medical-tests')
export class FileReadController {
    constructor(
        @InjectQuery('ReportGetFile') private readonly reportGetFileQuery: ReportGetFileQuery,
        @InjectQuery('ResultGetFile') private readonly resultGetFileQuery: ResultGetFileQuery,
        @InjectQuery('TestGetZipQuery') private readonly testGetZipQuery: TestGetZipQuery,
    ) { }

    @Get(':testId/report/file')
    async findOneReportFile(
        @Param('testId') testId: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.reportGetFileQuery.handleAsync({ testId });
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="medical_file.pdf"'
        });
        return new StreamableFile(buffer);
    }

    @Get(':testId/result/file')
    async findOneResultFile(
        @Param('testId') testId: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.resultGetFileQuery.handleAsync({ testId });
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="medical_file.pdf"'
        });
        return new StreamableFile(buffer);
    }

    @Post('zip/file')
    async findZipFile(
        @Body() body: TestZipRequestDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.testGetZipQuery.handleAsync({ values: body.values });
        response.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment;filename="medical_file.zip"'
        });
        return new StreamableFile(buffer);
    }
}