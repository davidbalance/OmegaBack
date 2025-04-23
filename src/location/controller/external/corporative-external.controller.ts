import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CorporativeFindOneByExternalKeyQuery } from "@omega/location/application/query/corporative/corporative.find-one-by-external-key.query";
import { CreateCorporativeFromExternalSourceService } from "@omega/location/application/service/create-corporative-from-external-source.service";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { InjectService } from "@omega/location/nest/inject/service.inject";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { CorporativeResponseDto } from "../dto/response/corporative.dto";
import { CorporativeModelMapper } from "../mapper/corporative-model.mapper";
import { CorporativeExternalResponseDto } from "../dto/response/corporative-external.dto";
import { CorporativeExternalModelMapper } from "../mapper/corporative-external-model.mapper";
import { CreateCorporativeFromExternalRequestDto } from "../dto/request/corporative-external.dto";

@ApiTags('Location', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/corporative')
export class CorporativeExternalController {
    constructor(
        @InjectQuery('CorporativeFindOneByExternalKey') private readonly findOneByExternalKey: CorporativeFindOneByExternalKeyQuery,
        @InjectService('CreateCorporativeFromExternalSource') private readonly createByExternalSource: CreateCorporativeFromExternalSourceService,
    ) { }

    @Get(':key')
    async findFromExternalSource(
        @Param('key') key: string,
        @CurrentUser() app: string
    ): Promise<CorporativeResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ owner: app, value: key });
        const data = CorporativeModelMapper.toDTO(value);
        return plainToInstance(CorporativeResponseDto, data);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateCorporativeFromExternalRequestDto
    ): Promise<CorporativeExternalResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = CorporativeExternalModelMapper.toDTO(value);
        return plainToInstance(CorporativeExternalResponseDto, data);
    }
}