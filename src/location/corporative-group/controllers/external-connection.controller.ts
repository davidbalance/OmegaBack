import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { PATCHCorporativeGroupRequestDTO, POSTCorporativeGroupRequestDTO } from "../dtos/external-connection.request.dto";
import { PATCHCorporativeGroupResponseDTO, POSTCorporativeGroupResponseDTO } from "../dtos/corporative-group.response.dto";
import { ExternalConnectionService } from "../services/external-connection.service";

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
        @Body() body: POSTCorporativeGroupRequestDTO
    ): Promise<POSTCorporativeGroupResponseDTO> {
        const group = await this.service.create({ ...body, source });
        return plainToInstance(POSTCorporativeGroupResponseDTO, group);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: PATCHCorporativeGroupRequestDTO
    ): Promise<PATCHCorporativeGroupResponseDTO> {
        const group = await this.service.findOneAndUpdate({ key: id, source }, body);
        return plainToInstance(PATCHCorporativeGroupResponseDTO, group);
    }
}