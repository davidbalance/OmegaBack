import { Body, Controller, Inject, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ResultExternalConnectionService } from "./result-external-connection.service";
import { FindResultResponseDTO } from "@/medical-result/common/dtos";
import { CreateResultExternalRequestExtendedDTO } from "@/medical-result/common/dtos/result-external-connection.request.dto";
import { plainToInstance } from "class-transformer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/authentication-guard";

@ApiTags('External Connections')
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
        @Body() body: CreateResultExternalRequestExtendedDTO,
        @UploadedFile() file: Express.Multer.File
    ): Promise<FindResultResponseDTO> {
        const order = await this.service.create({ source, ...body }, file);
        return plainToInstance(FindResultResponseDTO, order);
    }
}