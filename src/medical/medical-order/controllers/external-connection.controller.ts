import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { ExternalConnectionService } from "../services/external-connection.service";
import { GETMedicalOrderResponseDto } from "../dtos/medical-order.response.dto";
import { PATCHMedicalOrderProcessRequestDto, POSTMedicalOrderExternalConnectionRequestDto } from "../dtos/medical-order-external-connection.request.dto";

@ApiTags('External/Connection', 'Medical/Order')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/medical/order/:source')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Body() body: POSTMedicalOrderExternalConnectionRequestDto
    ): Promise<GETMedicalOrderResponseDto> {
        const order = await this.service.create({ source, ...body });
        return plainToInstance(GETMedicalOrderResponseDto, order);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: PATCHMedicalOrderProcessRequestDto
    ): Promise<GETMedicalOrderResponseDto> {
        const order = await this.service.findOneAndUpdate({ key: id, source: source }, body);
        return plainToInstance(GETMedicalOrderResponseDto, order);
    }
}