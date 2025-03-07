import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { OrderProcessResponseDto } from "../dto/response/order.dto";
import { OrderProcessFindManyQuery } from "@omega/medical/application/queries/order/order-process.find-many.query";
import { OrderProcessModelMapper } from "../mapper/order_process.mapper";

@ApiTags('Medical', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('processes')
export class OrderProcessReadController {
    constructor(
        @InjectQuery('OrderProcessFindMany') private readonly findManyQuery: OrderProcessFindManyQuery,
    ) { }

    @Get()
    async findManyOrders(): Promise<OrderProcessResponseDto[]> {
        const values = await this.findManyQuery.handleAsync();
        const data = values.map(e => OrderProcessModelMapper.toDTO(e));
        return plainToInstance(OrderProcessResponseDto, data);
    }
}