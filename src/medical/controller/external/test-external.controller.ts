import { Body, Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { InjectService } from "@omega/medical/nest/inject/service.inject";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { CurrentUser } from "@shared/shared/nest/decorators/current_user.decorator";
import { TestFindOneByExternalKeyQuery } from "@omega/medical/application/queries/test/test-find-one-by-external-key.query";
import { CreateTestFromExternalSourceService } from "@omega/medical/application/service/create-test-from-external-source.service";
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestModelMapper } from "../mapper/test.mapper";
import { TestExternalResponseDto } from "../dto/response/test-external.dto";
import { TestExternalModelMapper } from "../mapper/test.-external.mapper";
import { CreateTestFromExternalSourceRequestDto } from "../dto/request/test-external.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { InjectCommand } from "@omega/medical/nest/inject/command.inject";
import { ResultUploadBufferFromExternalSourceCommand } from "@omega/medical/application/commands/test/result-upload-buffer-from-external-source.command";
import { ResultUploadBase64FromExternalSourceCommand } from "@omega/medical/application/commands/test/result-upload-base64-from-external-source.command";
import { ResultUploadBase64RequestDto } from "../dto/request/test.dto";
import { ResultGetFileFromExternalSourceQuery } from "@omega/medical/application/queries/test/result-get-file-from-external-source.query";
import { Response } from "express";
import { TestResponseDto } from "../dto/response/test.dto";

@ApiTags('Medical', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/medical-test')
export class TestExternalController {
    constructor(
        @InjectQuery('TestFindOneByExternalKey') private readonly findOneByExternalKey: TestFindOneByExternalKeyQuery,
        @InjectQuery('ResultGetFileFromExternalSource') private readonly resultGetFileQuery: ResultGetFileFromExternalSourceQuery,
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