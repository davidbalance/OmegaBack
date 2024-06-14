import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { FindOrderResponseDTO } from "@/medical-result/common/dtos/order.response.dto";
import { plainToInstance } from "class-transformer";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { PATCHMedicalOrderRequestDTO, POSTMedicalOrderRequestDTO } from "@/medical-result/common/dtos/order-external-connection.request.dto";
import { ExternalConnectionService } from "../services/external-connection.service";

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
        @Body() body: POSTMedicalOrderRequestDTO
    ): Promise<FindOrderResponseDTO> {
        const order = await this.service.create({ source, ...body });
        return plainToInstance(FindOrderResponseDTO, order);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: PATCHMedicalOrderRequestDTO
    ): Promise<FindOrderResponseDTO> {
        const order = await this.service.findOneAndUpdate({ key: id, source: source }, body);
        return plainToInstance(FindOrderResponseDTO, order);
    }
}