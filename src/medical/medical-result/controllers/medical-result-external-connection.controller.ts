import { UseGuards, Controller, Inject, Get, Param, Post, UseInterceptors, Body, UploadedFile, Patch } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiHeader, ApiConsumes } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultExternalConnectionService } from "../services/medical-result-external-connection.service";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { GetExternalMedicalOrderResponseDto } from "@/medical/medical-order/dtos/response/external-medical-order.get.dto";
import { PostExternalMedicalResultRequestDto } from "../dtos/request/external-medical-result.post.dto";
import { PatchExternalMedicalResultFileRequestDto } from "../dtos/request/external-medical-result-file.patch.dto";
import { PatchExternalMedicalResultResponseDto } from "../dtos/response/external-medical-result.patch.dto";
import { PostExternalMedicalResultResponseDto } from "../dtos/response/external-medical-result.post.dto";

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
    ): Promise<GetExternalMedicalOrderResponseDto> {
        const medicalResult = await this.service.findOne({ key, source });
        return plainToInstance(GetExternalMedicalOrderResponseDto, medicalResult);
    }

    @ApiConsumes('multipart/form-data')
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExternalMedicalResultRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PostExternalMedicalResultResponseDto> {
        const order = await this.service.create({ source, key }, { ...body, file });
        return plainToInstance(PostExternalMedicalResultResponseDto, order);
    }

    @ApiConsumes('multipart/form-data')
    @Patch('file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() _: PatchExternalMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PatchExternalMedicalResultResponseDto> {
        const order = await this.service.findOneAndUpdate({ source, key }, { file });
        return plainToInstance(PatchExternalMedicalResultResponseDto, order);
    }
}