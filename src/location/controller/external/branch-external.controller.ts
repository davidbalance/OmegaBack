import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BranchFindOneByExternalKeyQuery } from "@omega/location/application/query/corporative/branch.find-one-by-external-key.query";
import { CreateBranchFromExternalSourceService } from "@omega/location/application/service/create-branch-from-external-source.service";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { InjectService } from "@omega/location/nest/inject/service.inject";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { BranchExternalResponseDto } from "../dto/response/branch-external.dto";
import { BranchExternalModelMapper } from "../mapper/branch-external-model.mapper";
import { CreateBranchFromExternalRequestDto } from "../dto/request/branch-external.dto";
import { BranchResponseDto } from "../dto/response/branch.dto";
import { BranchModelMapper } from "../mapper/branch_model.mapper";

@ApiTags('Location', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/branch')
export class BranchExternalController {
    constructor(
        @InjectQuery('BranchFindOneByExternalKey') private readonly findOneByExternalKey: BranchFindOneByExternalKeyQuery,
        @InjectService('CreateBranchFromExternalSource') private readonly createByExternalSource: CreateBranchFromExternalSourceService,
    ) { }

    @Get(':key')
    async findFromExternalSource(
        @Param('key') key: string,
        @CurrentUser() app: string
    ): Promise<BranchResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ owner: app, value: key });
        const data = BranchModelMapper.toDTO(value);
        return plainToInstance(BranchResponseDto, data);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateBranchFromExternalRequestDto
    ): Promise<BranchExternalResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = BranchExternalModelMapper.toDTO(value);
        return plainToInstance(BranchExternalResponseDto, data);
    }
}