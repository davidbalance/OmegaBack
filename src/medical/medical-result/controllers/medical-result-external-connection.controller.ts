import { UseGuards, Controller, Inject, Get, Param, Post, UseInterceptors, Body, UploadedFile, Patch } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiHeader, ApiConsumes } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultExternalConnectionService } from "../services/medical-result-external-connection.service";
import { GetMedicalResultResponseDto } from "../dtos/response/get.medical-result.response.dto";
import { PostMedicalResultExternalRequestDto } from "../dtos/request/post.medical-result-external.dto";
import { PostMedicalResultResponseDto } from "../dtos/response/post.medical-result.response.dto";
import { PatchMedicalResultFileRequestDto } from "../dtos/request/patch.medical-result-file.request.dto";
import { PatchMedicalResultFileResponseDto } from "../dtos/response/patch.medical-result-file.response.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";

@ApiTags('External/Connection', 'Medical/Result')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/medical/result/:source/:key')
export class MedicalResultExternalConnectionController {
    constructor(
        @Inject(MedicalResultExternalConnectionService) private readonly service: MedicalResultExternalConnectionService
    ) { }

    @Get()
    async findOne(
        @Param('source') source: string,
        @Param('key') key: string
    ): Promise<GetMedicalResultResponseDto> {
        const medicalResult = await this.service.findOne({ key, source });
        return plainToInstance(GetMedicalResultResponseDto, medicalResult);
    }

    @ApiConsumes('multipart/form-data')
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostMedicalResultExternalRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PostMedicalResultResponseDto> {
        const order = await this.service.create({ source, key }, { ...body, file });
        return plainToInstance(PostMedicalResultResponseDto, order);
    }

    @ApiConsumes('multipart/form-data')
    @Patch('file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() _: PatchMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PatchMedicalResultFileResponseDto> {
        const order = await this.service.findOneAndUpdate({ source, key }, { file });
        return plainToInstance(PatchMedicalResultFileResponseDto, order);
    }
}