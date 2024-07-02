import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { ExternalConnectionService } from "../services/external-connection.service";
import { PATCHMedicalOrderProcessRequestDto, POSTMedicalOrderExternalConnectionRequestDto } from "../dtos/medical-order-external-connection.request.dto";
import { GETMedicalOrderArrayExternalConnectionResponseDto, GETMedicalOrderExternalConnectionResponseDto } from "../dtos/medical-order-external-connection.response.dto";

@ApiTags('External/Connection', 'Medical/Order')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/medical/order')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Get('dni/:dni')
    async findAllOrdersByPatient(
        @Param('dni') dni: string,
    ): Promise<GETMedicalOrderArrayExternalConnectionResponseDto> {
        const orders = await this.service.findOrdersByPatient(dni);
        return plainToInstance(GETMedicalOrderArrayExternalConnectionResponseDto, { orders });
    }

    @UseGuards(ApiKeyAuthGuard)
    @Get(':source/:key')
    async findOrdersBySourceAndKey(
        @Param('source') source: string,
        @Param('key') key: string,
    ): Promise<GETMedicalOrderExternalConnectionResponseDto> {
        const order = await this.service.findOrderBySourceAndKey(source, key);
        return plainToInstance(GETMedicalOrderExternalConnectionResponseDto, order);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Post(':source')
    async create(
        @Param('source') source: string,
        @Body() body: POSTMedicalOrderExternalConnectionRequestDto
    ): Promise<GETMedicalOrderExternalConnectionResponseDto> {
        const order = await this.service.create({ source, ...body });
        return plainToInstance(GETMedicalOrderExternalConnectionResponseDto, order);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHMedicalOrderProcessRequestDto
    ): Promise<GETMedicalOrderExternalConnectionResponseDto> {
        const order = await this.service.findOneAndUpdate({ key: key, source: source }, body);
        return plainToInstance(GETMedicalOrderExternalConnectionResponseDto, order);
    }
}