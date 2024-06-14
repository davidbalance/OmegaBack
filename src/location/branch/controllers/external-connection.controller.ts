import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { ExternalConnectionService } from "../services/external-connection.service";
import { PATCHBranchRequestDTO, POSTBranchRequestDTO } from "../dtos/external-connection.request.dto";
import { PATCHBranchResponseDTO, POSTBranchResponseDTO } from "../dtos/branch.response.dto";

@ApiTags('Location/Branch', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/branch/:source')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Body() body: POSTBranchRequestDTO,
    ): Promise<POSTBranchResponseDTO> {
        const branch = await this.service.create({ source, ...body });
        return plainToInstance(POSTBranchResponseDTO, branch);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: PATCHBranchRequestDTO,
    ): Promise<PATCHBranchResponseDTO> {
        const branch = await this.service.findOneAndUpdate({ key: id, source: source }, body);
        return plainToInstance(PATCHBranchResponseDTO, branch);
    }
}