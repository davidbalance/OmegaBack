import { UseGuards, Controller, Inject, Get, Param, Post, UseInterceptors, Body, UploadedFile, Patch } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiHeader, ApiConsumes } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultExternalConnectionService } from "../services/medical-result-external-connection.service";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExternalMedicalResultRequestDto } from "../dtos/request/external-medical-result.post.dto";
import { PatchExternalMedicalResultFileRequestDto } from "../dtos/request/external-medical-result-file.patch.dto";
import { PatchExternalMedicalResultResponseDto } from "../dtos/response/external-medical-result.patch.dto";
import { PostExternalMedicalResultResponseDto } from "../dtos/response/external-medical-result.post.dto";
import { GetExternalMedicalResultResponseDto } from "../dtos/response/external-medical-result.get.dto";
import { PostMedicalResultBase64FileRequestDto } from "../dtos/request/external-medical-result-base64-file.post.dto";

@ApiTags('External Connection', 'Medical>Result')
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
    ): Promise<GetExternalMedicalResultResponseDto> {
        const medicalResult = await this.service.findOne({ key, source });
        return plainToInstance(GetExternalMedicalResultResponseDto, medicalResult);
    }

    @ApiConsumes('multipart/form-data')
    @Post(':source/:key')
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

    @Post(':source/:key/base64/file')
    async uploadFromBase64(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostMedicalResultBase64FileRequestDto,
    ): Promise<PatchExternalMedicalResultResponseDto> {
        const order = await this.service.findOneAndUploadBas64({ source, key }, body);
        return plainToInstance(PatchExternalMedicalResultResponseDto, order);
    }

    @ApiConsumes('multipart/form-data')
    @Post(':source/:key/file')
    @UseInterceptors(FileInterceptor('file'))
    async postUploadFileByExternalKey(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() _: PatchExternalMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PatchExternalMedicalResultResponseDto> {
        const order = await this.service.findOneAndUpdate({ source, key }, { file });
        return plainToInstance(PatchExternalMedicalResultResponseDto, order);
    }

    @ApiConsumes('multipart/form-data')
    @Patch(':source/:key/file')
    @UseInterceptors(FileInterceptor('file'))
    async patchUploadFileByExternalKey(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() _: PatchExternalMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PatchExternalMedicalResultResponseDto> {
        const order = await this.service.findOneAndUpdate({ source, key }, { file });
        return plainToInstance(PatchExternalMedicalResultResponseDto, order);
    }

    @ApiConsumes('multipart/form-data')
    @Patch(':id/file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileById(
        @Param('id') id: number,
        @Body() _: PatchExternalMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PatchExternalMedicalResultResponseDto> {
        const order = await this.service.findOneAndUpdate(id, { file });
        return plainToInstance(PatchExternalMedicalResultResponseDto, order);
    }
}