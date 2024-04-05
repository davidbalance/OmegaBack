import { Body, Controller, Inject, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyExternalConnectionService } from "./company-external-connection.service";
import { CreateCompanyExternalRequestDTO, FindCompanyExternalAndUpdateRequestDTO } from "../dtos/company-external-key.request.dto";
import { FindCompanyResponseDTO } from "../dtos/company.response.dto";
import { plainToInstance } from "class-transformer";

@ApiTags('External Connections')
@Controller('company-external-connection')
export class CompanyExternalConnectionController {
    constructor(
        @Inject(CompanyExternalConnectionService) private readonly service: CompanyExternalConnectionService
    ) { }

    @Post(':source')
    async create(
        @Param('source') source: string,
        @Body() body: CreateCompanyExternalRequestDTO
    ): Promise<FindCompanyResponseDTO> {
        const company = await this.service.create({ source, ...body });
        return plainToInstance(FindCompanyResponseDTO, company);
    }

    @Patch(':source/:id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: FindCompanyExternalAndUpdateRequestDTO
    ): Promise<FindCompanyResponseDTO> {
        const company = await this.service.findOneAndUpdate({ key: id, source: source }, body);
        return plainToInstance(FindCompanyResponseDTO, company);
    }

}