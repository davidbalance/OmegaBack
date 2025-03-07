import { Controller, Get, Param, Query, Res, StreamableFile, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DiseaseReportFindOneQuery } from "@omega/medical/application/queries/test/disease-report-find-one.query";
import { ReportFindOneQuery } from "@omega/medical/application/queries/test/report-find-one.query";
import { TestFindManyQuery } from "@omega/medical/application/queries/test/test-find-many.query";
import { TestReportGetFileQuery } from "@omega/medical/application/queries/test/test-report-get-file.query";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { DiseaseReportResponseDto, ReportResponseDto, TestFileResultCountResponseDto, TestResponseDto } from "../dto/response/test.dto";
import { DiseaseReportModelMapper } from "../mapper/disease_report.mapper";
import { plainToInstance } from "class-transformer";
import { ReportModelMapper } from "../mapper/report.mapper";
import { TestModelMapper } from "../mapper/test.mapper";
import { TestQueryDto, TestReportGetFileQueryDto } from "../dto/query/test_query.dto";
import { TestFindOneQuery } from "@omega/medical/application/queries/test/test-find-one.query";
import { TestFileResultCountQuery } from "@omega/medical/application/queries/test/test-file-result-count.query";
import { TestFileResultReportQuery } from "@omega/medical/application/queries/test/test-file-result-report.query";
import { Response } from "express";

@ApiTags('Medical', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-tests')
export class TestReadController {
    constructor(
        @InjectQuery('DiseaseReportFindOne') private readonly diseaseReportFindOneQuery: DiseaseReportFindOneQuery,
        @InjectQuery('ReportFindOne') private readonly reportFindOneQuery: ReportFindOneQuery,
        @InjectQuery('TestFindMany') private readonly testFindManyQuery: TestFindManyQuery,
        @InjectQuery('TestFindOne') private readonly testFindOneQuery: TestFindOneQuery,
        @InjectQuery('TestReportGetFile') private readonly testReportGetFileQuery: TestReportGetFileQuery,
        @InjectQuery('TestFileResultCount') private readonly testFileResultCountQuery: TestFileResultCountQuery,
        @InjectQuery('TestFileResultReport') private readonly testFileResultReport: TestFileResultReportQuery,
    ) { }

    @Get(':testId/diseases/:diseaseId')
    async findOneDisease(
        @Param('diseaseId') diseaseReportId: string,
    ): Promise<DiseaseReportResponseDto> {
        const values = await this.diseaseReportFindOneQuery.handleAsync({ diseaseReportId });
        const data = DiseaseReportModelMapper.toDTO(values);
        return plainToInstance(DiseaseReportResponseDto, data);
    }

    @Get('found-file/count')
    async foundFileCount(): Promise<TestFileResultCountResponseDto> {
        const data = await this.testFileResultCountQuery.handleAsync();
        return plainToInstance(TestFileResultCountResponseDto, data);
    }

    @Get('found-file/report')
    async foundFileReport(
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.testFileResultReport.handleAsync();
        response.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment;filename="medical_file.xslx"'
        });
        return new StreamableFile(buffer);
    }

    @Get(':testId/report')
    async findOneReport(
        @Param('testId') testId: string
    ): Promise<ReportResponseDto> {
        const values = await this.reportFindOneQuery.handleAsync({ testId });
        const data = ReportModelMapper.toDTO(values);
        return plainToInstance(ReportResponseDto, data);
    }

    @Get(':orderId')
    async findManyTests(
        @Query() query: TestQueryDto,
        @Param('orderId') orderId: string
    ): Promise<TestResponseDto[]> {
        const values = await this.testFindManyQuery.handleAsync({
            ...query, orderId,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = values.map(e => TestModelMapper.toDTO(e))
        return plainToInstance(TestResponseDto, data);
    }

    @Get(':testId/test')
    async findManyDiseases(
        @Param('testId') testId: string
    ): Promise<TestResponseDto> {
        const value = await this.testFindOneQuery.handleAsync({ testId, });
        const data = TestModelMapper.toDTO(value)
        return plainToInstance(TestResponseDto, data);
    }

    @Get('disease-report/file')
    async findOneDiseaseReport(
        @Query() query: TestReportGetFileQueryDto
    ): Promise<StreamableFile> {
        const buffer = await this.testReportGetFileQuery.handleAsync({ ...query });
        return new StreamableFile(buffer);
    }

    @Get(':orderId')
    async getZipper(
        @Query() query: TestQueryDto,
        @Param('orderId') orderId: string
    ): Promise<TestResponseDto[]> {
        const values = await this.testFindManyQuery.handleAsync({
            ...query, orderId,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = values.map(e => TestModelMapper.toDTO(e))
        return plainToInstance(TestResponseDto, data);
    }
}