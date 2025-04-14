import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "@omega/laboratory/nest/inject/query.inject";
import { CurrentUser } from "@shared/shared/nest/decorators/current_user.decorator";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectService } from "@omega/laboratory/nest/inject/service.inject";
import { CreateExamSubtypeFromExternalSourceService } from "@omega/laboratory/application/service/create-exam-subtype-from-external-source.service";
import { ExamSubtypeFindOneByExternalKeyQuery } from "@omega/laboratory/application/query/exam/exam-subtype-find-one-by-external-key.query";
import { ExamSubtypeResponseDto } from "../dto/response/exam_subtype.dto";
import { ExamSubtypeModelMapper } from "../mapper/exam/exam_subtype_model.mapper";
import { ExamSubtypeExternalResponseDto } from "../dto/response/exam-subtype-external.dto";
import { CreateExamSubtypeExternalRequestDto } from "../dto/request/exam-subtype-external.dto";
import { ExamSubtypeExternalModelMapper } from "../mapper/exam/exam-subtype-external-model.mapper";

@ApiTags('Laboratory', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/exam-subtype')
export class ExamSubtypeExternalController {
    constructor(
        @InjectQuery('ExamSubtypeFindOneByExternalKey') private readonly findOneByExternalKey: ExamSubtypeFindOneByExternalKeyQuery,
        @InjectService('CreateExamSubtypeFromExternalSource') private readonly createByExternalSource: CreateExamSubtypeFromExternalSourceService,
    ) { }

    @Get(':key')
    async findFromExternalSource(
        @Param('key') key: string,
        @CurrentUser() app: string
    ): Promise<ExamSubtypeResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ owner: app, value: key });
        const data = ExamSubtypeModelMapper.toDTO(value);
        return plainToInstance(ExamSubtypeResponseDto, data);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateExamSubtypeExternalRequestDto
    ): Promise<ExamSubtypeExternalResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = ExamSubtypeExternalModelMapper.toDTO(value);
        return plainToInstance(ExamSubtypeExternalResponseDto, data);
    }
}