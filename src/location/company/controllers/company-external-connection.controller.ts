import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CompanyExternalConnectionService } from "../services/company-external-connection.service";
import { PostCompanyExternalRequestDto } from "../dtos/request/external-company.post.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExtendedCompanyResponseDto } from "../dtos/response/extended-company.post.dto";
import { PatchExtendedCompanyResponseDto } from "../dtos/response/extended-company.patch.dto";
import { PatchCompanyExternalRequestDto } from "../dtos/request/external-company.patch.dto";

@ApiTags('Location/Company', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/company/:source/:key')
export class CompanyExternalConnectionController {
    constructor(
        @Inject(CompanyExternalConnectionService) private readonly service: CompanyExternalConnectionService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostCompanyExternalRequestDto
    ): Promise<PostExtendedCompanyResponseDto> {
        const company = await this.service.create({ source, key }, body);
        return plainToInstance(PostExtendedCompanyResponseDto, company);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchCompanyExternalRequestDto
    ): Promise<PatchExtendedCompanyResponseDto> {
        const company = await this.service.findOneAndUpdate({ key, source }, body);
        return plainToInstance(PatchExtendedCompanyResponseDto, company);
    }

}