import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { InjectService } from "@omega/medical/nest/inject/service.inject";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { OrderFindOneByExternalKeyQuery } from "@omega/medical/application/queries/order/order.find-one-by-external-key.query";
import { CreateOrderFromExternalSourceService } from "@omega/medical/application/service/create-order-from-external-source.service";
import { OrderModelMapper } from "../mapper/order.mapper";
import { CreateOrderFromExternalSourceDto } from "../dto/request/order-external.dto";
import { OrderExternalResponseDto } from "../dto/response/order-external.dto";
import { OrderExternalModelMapper } from "../mapper/order-external.mapper";
import { OrderResponseDto } from "../dto/response/order.dto";

@ApiTags('Medical', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/medical-order')
export class OrderExternalController {
    constructor(
        @InjectQuery('OrderFindOneByExternalKey') private readonly findOneByExternalKey: OrderFindOneByExternalKeyQuery,
        @InjectService('CreateOrderFromExternalSource') private readonly createByExternalSource: CreateOrderFromExternalSourceService,
    ) { }

    @Get(':key')
    async findFromExternalSource(
        @CurrentUser() app: string,
        @Param('key') key: string
    ): Promise<OrderResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ owner: app, value: key });
        const data = OrderModelMapper.toDTO(value);
        return plainToInstance(OrderResponseDto, data);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreateOrderFromExternalSourceDto
    ): Promise<OrderExternalResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = OrderExternalModelMapper.toDTO(value);
        return plainToInstance(OrderExternalResponseDto, data);
    }
}