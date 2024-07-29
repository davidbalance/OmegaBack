import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { CompanyExternalConnectionService } from "../services/company-external-connection.service";
import { PostCompanyResponseDto } from "../dtos/response/post.company.response.dto";
import { PatchCompanyRequestDto } from "../dtos/request/patch.company.request.dto";
import { PatchCompanyResponseDto } from "../dtos/response/patch.company.response.dto";
import { PostCompanyExternalRequestDto } from "../dtos/request/post.company-external.request.dto";

@ApiTags('Location/Company', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/company/:source/:key')
export class CompanyExternalConnectionController {
    constructor(
        @Inject(CompanyExternalConnectionService) private readonly service: CompanyExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostCompanyExternalRequestDto
    ): Promise<PostCompanyResponseDto> {
        const company = await this.service.create({ source, key }, body);
        return plainToInstance(PostCompanyResponseDto, company);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchCompanyRequestDto
    ): Promise<PatchCompanyResponseDto> {
        const company = await this.service.findOneAndUpdate({ key, source }, body);
        return plainToInstance(PatchCompanyResponseDto, company);
    }

}