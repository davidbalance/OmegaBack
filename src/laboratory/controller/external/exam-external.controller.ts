import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ExamFindOneByExternalKeyQuery } from "@omega/laboratory/application/query/exam/exam-find-one-by-external-key.query";
import { InjectQuery } from "@omega/laboratory/nest/inject/query.inject";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { ExamResponseDto } from "../dto/response/exam.dto";
import { plainToInstance } from "class-transformer";
import { ExamModelMapper } from "../mapper/exam/exam-model.mapper";
import { CreateExamExternalRequestDto } from "../dto/request/exam-external.dto";
import { InjectService } from "@omega/laboratory/nest/inject/service.inject";
import { CreateExamFromExternalSourceService } from "@omega/laboratory/application/service/create-exam-from-external-source.service";
import { ExamExternalResponseDto } from "../dto/response/exam-external.dto";
import { ExamExternalModelMapper } from "../mapper/exam/exam-external-model.mapper";

@ApiTags('Laboratory', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/exam')
export class ExamExternalController {
    constructor(
        @InjectQuery('ExamFindOneByExternalKey') private readonly findOneByExternalKey: ExamFindOneByExternalKeyQuery,
        @InjectService('CreateExamFromExternalSource') private readonly createByExternalSource: CreateExamFromExternalSourceService,
    ) { }

    @Get(':key')
    async findFromExternalSource(
        @Param('key') key: string,
        @CurrentUser() app: string
    ): Promise<ExamResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ owner: app, value: key });
        const data = ExamModelMapper.toDTO(value);
        return plainToInstance(ExamResponseDto, data);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateExamExternalRequestDto
    ): Promise<ExamExternalResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = ExamExternalModelMapper.toDTO(value);
        return plainToInstance(ExamExternalResponseDto, data);
    }
}