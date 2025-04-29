import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { OrderCloudFindManyQuery } from "@omega/medical/application/queries/order/order-cloud-find-many.query";
import { OrderCloudFileResponseDto } from "../dto/response/order.dto";
import { OrderCloudFileModelMapper } from "../mapper/order-cloud-file.mapper";

@ApiTags('Medical', 'Read')
@Controller('medical-order-cloud')
export class OrderCloudReadController {
    constructor(
        @InjectQuery('OrderCloudFindMany') private readonly cloudFindManyQuery: OrderCloudFindManyQuery
    ) { }

    @Get(':orderId')
    async findCloudFiles(
        @Param('orderId') orderId: string
    ): Promise<OrderCloudFileResponseDto[]> {
        const values = await this.cloudFindManyQuery.handleAsync({ orderId });
        const data = values.map(e => OrderCloudFileModelMapper.toDTO(e));
        return plainToInstance(OrderCloudFileResponseDto, data);
    }
}