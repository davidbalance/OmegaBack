import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { PATCHExamRequestDTO, POSTExamRequestDTO } from "../dtos/external-connection.request.dto";
import { GETExamResponseDTO } from "../dtos/exam.response.dto";
import { ExternalConnectionService } from "../services/external-connection.service";

@ApiTags('External/Connection', 'Laboratory/Exam')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/exams/:source')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Body() body: POSTExamRequestDTO
    ): Promise<GETExamResponseDTO> {
        const exam = await this.service.create({ source, ...body });
        return plainToInstance(GETExamResponseDTO, exam);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: PATCHExamRequestDTO
    ): Promise<GETExamResponseDTO> {
        const exam = await this.service.findOneAndUpdate({ source, key: id }, body);
        return plainToInstance(GETExamResponseDTO, exam);
    }
}