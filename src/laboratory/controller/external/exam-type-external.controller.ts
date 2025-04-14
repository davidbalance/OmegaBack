import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "@omega/laboratory/nest/inject/query.inject";
import { CurrentUser } from "@shared/shared/nest/decorators/current_user.decorator";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectService } from "@omega/laboratory/nest/inject/service.inject";
import { ExamTypeFindOneByExternalKeyQuery } from "@omega/laboratory/application/query/exam/exam-type-find-one-by-external-key.query";
import { CreateExamTypeFromExternalSourceService } from "@omega/laboratory/application/service/create-exam-type-from-external-source.service";
import { ExamTypeModelMapper } from "../mapper/exam/exam_type_model.mapper";
import { ExamTypeResponseDto } from "../dto/response/exam_type.dto";
import { CreateExamTypeExternalRequestDto } from "../dto/request/exam-type-external.dto";
import { ExamTypeExternalModelMapper } from "../mapper/exam/exam-type-external-model.mapper";
import { ExamTypeExternalResponseDto } from "../dto/response/exam-type-external.dto";

@ApiTags('Laboratory', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/exam-type')
export class ExamTypeExternalController {
    constructor(
        @InjectQuery('ExamTypeFindOneByExternalKey') private readonly findOneByExternalKey: ExamTypeFindOneByExternalKeyQuery,
        @InjectService('CreateExamTypeFromExternalSource') private readonly createByExternalSource: CreateExamTypeFromExternalSourceService,
    ) { }

    @Get(':key')
    async findFromExternalSource(
        @Param('key') key: string,
        @CurrentUser() app: string
    ): Promise<ExamTypeResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ owner: app, value: key });
        const data = ExamTypeModelMapper.toDTO(value);
        return plainToInstance(ExamTypeResponseDto, data);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateExamTypeExternalRequestDto
    ): Promise<ExamTypeExternalResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = ExamTypeExternalModelMapper.toDTO(value);
        return plainToInstance(ExamTypeExternalResponseDto, data);
    }
}