import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { OrderExternalConnectionService } from "./order-external-connection.service";
import { FindOrderResponseDTO } from "@/medical-result/common/dtos/order.response.dto";
import { plainToInstance } from "class-transformer";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { PATCHMedicalOrderRequestDTO, POSTMedicalOrderRequestDTO } from "@/medical-result/common/dtos/order-external-connection.request.dto";

@ApiTags('External Connections')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('order-external-connection')
export class OrderExternalConnectionController {
    constructor(
        @Inject(OrderExternalConnectionService) private readonly service: OrderExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post(':source')
    async create(
        @Param('source') source: string,
        @Body() body: POSTMedicalOrderRequestDTO
    ): Promise<FindOrderResponseDTO> {
        const order = await this.service.create({ source, ...body });
        return plainToInstance(FindOrderResponseDTO, order);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':source/:id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: PATCHMedicalOrderRequestDTO
    ): Promise<FindOrderResponseDTO> {
        const order = await this.service.findOneAndUpdate({ key: id, source: source }, body);
        return plainToInstance(FindOrderResponseDTO, order);
    }
}