import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { ExternalConnectionService } from "../services/external-connection.service";
import { POSTCorporativeGroupRequestDto, PATCHCorporativeGroupRequestDto } from "../dtos/corporative-group.request.dto";
import { POSTCorporativeGroupResponseDto, PATCHCorporativeGroupResponseDto } from "../dtos/corporative-group.response.dto";

@ApiTags('Location/Corporative/Group', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/corporative/groups/:source')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Body() body: POSTCorporativeGroupRequestDto
    ): Promise<POSTCorporativeGroupResponseDto> {
        const group = await this.service.create({ ...body, source });
        return plainToInstance(POSTCorporativeGroupResponseDto, group);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHCorporativeGroupRequestDto
    ): Promise<PATCHCorporativeGroupResponseDto> {
        const group = await this.service.findOneAndUpdate({ key: key, source }, body);
        return plainToInstance(PATCHCorporativeGroupResponseDto, group);
    }
}