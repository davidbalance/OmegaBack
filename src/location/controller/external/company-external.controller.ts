import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyFindOneByExternalKeyQuery } from "@omega/location/application/query/corporative/company.find-one-by-external-key.query";
import { CreateCompanyFromExternalSourceService } from "@omega/location/application/service/create-company-from-external-source.service";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { InjectService } from "@omega/location/nest/inject/service.inject";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { CompanyResponseDto } from "../dto/response/company.dto";
import { CompanyModelMapper } from "../mapper/company_model.mapper";
import { plainToInstance } from "class-transformer";
import { CreateCompanyFromExternalRequestDto } from "../dto/request/company-external.dto";
import { CompanyExternalResponseDto } from "../dto/response/company-external.dto";
import { CompanyExternalModelMapper } from "../mapper/company-external-model.mapper";

@ApiTags('Location', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/company')
export class CompanyExternalController {
    constructor(
        @InjectQuery('CompanyFindOneByExternalKey') private readonly findOneByExternalKey: CompanyFindOneByExternalKeyQuery,
        @InjectService('CreateCompanyFromExternalSource') private readonly createByExternalSource: CreateCompanyFromExternalSourceService,
    ) { }

    @Get(':key')
    async findFromExternalSource(
        @Param('key') key: string,
        @CurrentUser() app: string
    ): Promise<CompanyResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ owner: app, value: key });
        const data = CompanyModelMapper.toDTO(value);
        return plainToInstance(CompanyResponseDto, data);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateCompanyFromExternalRequestDto
    ): Promise<CompanyExternalResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = CompanyExternalModelMapper.toDTO(value);
        return plainToInstance(CompanyExternalResponseDto, data);
    }
}