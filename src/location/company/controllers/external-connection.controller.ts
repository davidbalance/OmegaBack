import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { ExternalConnectionService } from "../services/external-connection.service";
import { PATCHCompanyRequestDTO, POSTCompanyRequestDTO } from "../dtos/external-key.request.dto";
import { PATCHCompanyResponseDTO, POSTCompanyResponseDTO } from "../dtos/company.response.dto";

@ApiTags('Location/Company', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/company/:source')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post(':source')
    async create(
        @Param('source') source: string,
        @Body() body: POSTCompanyRequestDTO
    ): Promise<POSTCompanyResponseDTO> {
        const company = await this.service.create({ source, ...body });
        return plainToInstance(POSTCompanyResponseDTO, company);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':source/:id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: PATCHCompanyRequestDTO
    ): Promise<PATCHCompanyResponseDTO> {
        const company = await this.service.findOneAndUpdate({ key: id, source: source }, body);
        return plainToInstance(PATCHCompanyResponseDTO, company);
    }

}