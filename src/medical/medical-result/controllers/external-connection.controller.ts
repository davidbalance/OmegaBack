import { Body, Controller, Inject, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiHeader, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { ExternalConnectionService } from "../services/external-connection.service";
import { POSTMedicalResultFileRequestDto } from "../dtos/medical-result.request.dto";
import { POSTMedicalResultFileResponseDto } from "../dtos/medical-result.response.dto";

@ApiTags('External/Connection', 'Medical/Result')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/medical/result/:source')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @ApiConsumes('multipart/form-data')
    @UseGuards(ApiKeyAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Param('source') source: string,
        @Body() body: POSTMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<POSTMedicalResultFileResponseDto> {
        const order = await this.service.create({ source, ...body }, file);
        return plainToInstance(POSTMedicalResultFileResponseDto, order);
    }
}