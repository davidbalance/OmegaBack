import { Body, Controller, Get, Inject, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiHeader, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { ExternalConnectionService } from "../services/external-connection.service";
import { PATCHMedicalResultFileRequestDto, POSTMedicalResultFileRequestDto } from "../dtos/medical-result.request.dto";
import { GETMedicalResultResponseDto, POSTMedicalResultFileResponseDto } from "../dtos/medical-result.response.dto";

@ApiTags('External/Connection', 'Medical/Result')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/medical/result/:source')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Get('key/:key')
    async findResultBySourceAndKey(
        @Param('source') source: string,
        @Param('key') key: string
    ): Promise<GETMedicalResultResponseDto> {
        const medicalResult = await this.service.findBySourceAndKey(source, key);
        return plainToInstance(GETMedicalResultResponseDto, medicalResult);
    }

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

    @ApiConsumes('multipart/form-data')
    @UseGuards(ApiKeyAuthGuard)
    @Patch('file/:key')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<POSTMedicalResultFileResponseDto> {
        const order = await this.service.findOneResultAndUploadFile({ source, key }, file);
        return plainToInstance(POSTMedicalResultFileResponseDto, order);
    }
}