import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { UseGuards, Controller, Inject, Get, Param, Post, UseInterceptors, Body, UploadedFile, Patch } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiHeader, ApiConsumes } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GETMedicalResultExternalConnectionResponseDto } from "../dtos/get.medical-result-external-connection.dto";
import { PATCHMedicalResultFileRequestDto } from "../dtos/patch.medical-result.dto";
import { POSTMedicalResultFileResponseDto, POSTMedicalResultWithExternalKeyRequestDto } from "../dtos/post.medical-result-external-connection.dto";
import { MedicalResultExternalConnectionService } from "../services/medical-result-external-connection.service";

@ApiTags('External/Connection', 'Medical/Result')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/medical/result')
export class MedicalResultExternalConnectionController {
    constructor(
        @Inject(MedicalResultExternalConnectionService) private readonly service: MedicalResultExternalConnectionService
    ) { }

    @Get(':source/:key')
    async findOne(
        @Param('source') source: string,
        @Param('key') key: string
    ): Promise<GETMedicalResultExternalConnectionResponseDto> {
        const medicalResult = await this.service.findOne({ key, source });
        return plainToInstance(GETMedicalResultExternalConnectionResponseDto, medicalResult);
    }

    @ApiConsumes('multipart/form-data')
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() body: POSTMedicalResultWithExternalKeyRequestDto,
        @UploadedFile() _: Express.Multer.File
    ): Promise<POSTMedicalResultFileResponseDto> {
        const order = await this.service.create(body);
        return plainToInstance(POSTMedicalResultFileResponseDto, order);
    }

    @ApiConsumes('multipart/form-data')
    @Patch('file/:source/:key')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() _: PATCHMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<POSTMedicalResultFileResponseDto> {
        const order = await this.service.findOneAndUpdate({ source, key }, { file });
        return plainToInstance(POSTMedicalResultFileResponseDto, order);
    }
}