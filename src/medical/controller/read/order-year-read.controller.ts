import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { OrderYearResponseDto } from "../dto/response/order.dto";
import { OrderYearModelMapper } from "../mapper/order-year.mapper";
import { OrderYearFindManyQuery } from "@omega/medical/application/queries/order/order-year.find-many.query";

@ApiTags('Medical', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('years')
export class OrderYearReadController {
    constructor(
        @InjectQuery('OrderYearFindMany') private readonly findManyQuery: OrderYearFindManyQuery,
    ) { }

    @Get()
    async findManyOrders(): Promise<OrderYearResponseDto[]> {
        const values = await this.findManyQuery.handleAsync();
        const data = values.map(e => OrderYearModelMapper.toDTO(e));
        return plainToInstance(OrderYearResponseDto, data);
    }
}