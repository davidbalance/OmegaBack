import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ExamExternalConnectionService } from "./exam-external-connection.service";
import { CreateExamExternalRequestDTO, FindOneExamExternalAndUpdateRequestDTO } from "../dtos/exam-external-connection.request.dto";
import { FindExamResponseDTO } from "../dtos";
import { plainToInstance } from "class-transformer";
import { ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/authentication-guard";

@ApiTags('External Connections')
@Controller('exam-external-connection')
export class ExamExternalConnectionController {
    constructor(
        @Inject(ExamExternalConnectionService) private readonly service: ExamExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post(':source')
    async create(
        @Param('source') source: string,
        @Body() body: CreateExamExternalRequestDTO
    ): Promise<FindExamResponseDTO> {
        const exam = await this.service.create({ source, ...body });
        return plainToInstance(FindExamResponseDTO, exam);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':source/:id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: FindOneExamExternalAndUpdateRequestDTO
    ): Promise<FindExamResponseDTO> {
        const exam = await this.service.findOneAndUpdate({ source, key: id }, body);
        return plainToInstance(FindExamResponseDTO, exam);
    }
}