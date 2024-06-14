import { Body, Controller, Inject, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ResultExternalConnectionService } from "./result-external-connection.service";
import { FindResultResponseDTO } from "@/medical-result/common/dtos";
import { plainToInstance } from "class-transformer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiHeader, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { POSTMedicalResultFileRequestDTO } from "@/medical-result/common/dtos/result-external-connection.request.dto";

@ApiTags('External Connections')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('result-external-connection')
export class ResultExternalConnectionController {
    constructor(
        @Inject(ResultExternalConnectionService) private readonly service: ResultExternalConnectionService
    ) { }

    @ApiConsumes('multipart/form-data')
    @UseGuards(ApiKeyAuthGuard)
    @Post(':source')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Param('source') source: string,
        @Body() body: POSTMedicalResultFileRequestDTO,
        @UploadedFile() file: Express.Multer.File
    ): Promise<FindResultResponseDTO> {
        const order = await this.service.create({ source, ...body }, file);
        return plainToInstance(FindResultResponseDTO, order);
    }
}