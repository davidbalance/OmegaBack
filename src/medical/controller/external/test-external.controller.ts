import { Body, Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiProduces, ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { InjectService } from "@omega/medical/nest/inject/service.inject";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { CurrentUser } from "@shared/shared/nest/decorators/current_user.decorator";
import { TestFindOneByExternalKeyQuery } from "@omega/medical/application/queries/test/test-find-one-by-external-key.query";
import { CreateTestFromExternalSourceService } from "@omega/medical/application/service/create-test-from-external-source.service";
import { TestModelMapper } from "../mapper/test.mapper";
import { TestExternalResponseDto, TestOrderExternalResponseDto } from "../dto/response/test-external.dto";
import { TestExternalModelMapper } from "../mapper/test-external.mapper";
import { CreateManyTestFromExternalSourceRequestDto, CreateTestFromExternalSourceRequestDto } from "../dto/request/test-external.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { InjectCommand } from "@omega/medical/nest/inject/command.inject";
import { ResultUploadBufferFromExternalSourceCommand } from "@omega/medical/application/commands/test/result-upload-buffer-from-external-source.command";
import { ResultUploadBase64FromExternalSourceCommand } from "@omega/medical/application/commands/test/result-upload-base64-from-external-source.command";
import { ResultUploadBase64RequestDto, ResultUploadBufferRequestDto } from "../dto/request/test.dto";
import { ResultGetFileFromExternalSourceQuery } from "@omega/medical/application/queries/test/result-get-file-from-external-source.query";
import { Response } from "express";
import { TestResponseDto } from "../dto/response/test.dto";
import { CreateManyTestFromExternalSourceService } from "@omega/medical/application/service/create-many-test-from-external-source.service";
import { TestOrderExternalModelMapper } from "../mapper/test-order-external.mapper";
import { TestFindManyByExternalKeyQuery } from "@omega/medical/application/queries/test/test-find-many-by-external-key.query";

@ApiTags('Medical', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/medical-test')
export class TestExternalController {
    constructor(
        @InjectQuery('TestFindOneByExternalKey') private readonly findOneByExternalKey: TestFindOneByExternalKeyQuery,
        @InjectQuery('TestFindManyByExternalKey') private readonly findManyByExternalKey: TestFindManyByExternalKeyQuery,
        @InjectQuery('ResultGetFileFromExternalSource') private readonly resultGetFileQuery: ResultGetFileFromExternalSourceQuery,
        @InjectService('CreateManyTestFromExternalSource') private readonly createManyByExternalSource: CreateManyTestFromExternalSourceService,
        @InjectService('CreateTestFromExternalSource') private readonly createByExternalSource: CreateTestFromExternalSourceService,
        @InjectCommand('ResultUploadBufferFromExternalSource') private readonly uploadBufferFromExternalSource: ResultUploadBufferFromExternalSourceCommand,
        @InjectCommand('ResultUploadBase64FromExternalSource') private readonly uploadBase64FromExternalSource: ResultUploadBase64FromExternalSourceCommand,
    ) { }

    @Get(':key')
    async findFromExternalSource(
        @CurrentUser() app: string,
        @Param('key') key: string
    ): Promise<TestResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ owner: app, value: key });
        const data = TestModelMapper.toDTO(value);
        return plainToInstance(TestResponseDto, data);
    }

    @Get(':orderKey/many')
    async findManyFromExternalSource(
        @CurrentUser() app: string,
        @Param('key') key: string
    ): Promise<TestResponseDto[]> {
        const value = await this.findManyByExternalKey.handleAsync({ owner: app, value: key });
        const data = value.map(e => TestModelMapper.toDTO(e));
        return plainToInstance(TestResponseDto, data);
    }

    @ApiOkResponse({ schema: { type: 'string', format: 'binary' }, })
    @ApiProduces('application/pdf')
    @Get(':key/result')
    async getResultFile(
        @CurrentUser() app: string,
        @Param('key') key: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.resultGetFileQuery.handleAsync({ owner: app, value: key });
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="medical_file.pdf"'
        });
        return new StreamableFile(buffer);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateTestFromExternalSourceRequestDto
    ): Promise<TestExternalResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = TestExternalModelMapper.toDTO(value);
        return plainToInstance(TestExternalResponseDto, data);
    }

    @Post('many')
    async createManyFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateManyTestFromExternalSourceRequestDto
    ): Promise<TestOrderExternalResponseDto> {
        console.log(body);
        const value = await this.createManyByExternalSource.createAsync({ ...body, owner: app });
        const data = TestOrderExternalModelMapper.toDTO(value);
        return plainToInstance(TestOrderExternalResponseDto, data);
    }

    @Post(':key/result/base64')
    async uploadResultBase64FromExternalSource(
        @Param('key') key: string,
        @CurrentUser() app: string,
        @Body() body: ResultUploadBase64RequestDto
    ): Promise<string> {
        await this.uploadBase64FromExternalSource.handleAsync({ ...body, owner: app, value: key });
        return "Ok";
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: ResultUploadBufferRequestDto })
    @UseInterceptors(FileInterceptor('file'))
    @Post(':key/result/file')
    async uploadResultFileFromExternalSource(
        @Param('key') key: string,
        @CurrentUser() app: string,
        @UploadedFile() file: Express.Multer.File
    ): Promise<string> {
        await this.uploadBufferFromExternalSource.handleAsync({
            owner: app,
            value: key,
            buffer: file.buffer
        });
        return "Ok";
    }
}