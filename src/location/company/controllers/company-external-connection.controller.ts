import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { CompanyExternalConnectionService } from "../services/company-external-connection.service";
import { PATCHCompanyRequestDto, POSTCompanyRequestDto } from "../dtos/company.request.dto";
import { PATCHCompanyResponseDto, POSTCompanyResponseDto } from "../dtos/company.response.dto";

@ApiTags('Location/Company', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/company/:source')
export class CompanyExternalConnectionController {
    constructor(
        @Inject(CompanyExternalConnectionService) private readonly service: CompanyExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Body() body: POSTCompanyRequestDto
    ): Promise<POSTCompanyResponseDto> {
        const company = await this.service.create({ source, ...body });
        return plainToInstance(POSTCompanyResponseDto, company);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHCompanyRequestDto
    ): Promise<PATCHCompanyResponseDto> {
        const company = await this.service.findOneAndUpdate({ key: key, source: source }, body);
        return plainToInstance(PATCHCompanyResponseDto, company);
    }

}