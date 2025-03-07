import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectCommand } from "@omega/medical/nest/inject/command.inject";
import { OrderSendMailCommand } from "@omega/medical/application/commands/order/order-send-mail.command";
import { OrderCreateRequestDto, OrderSendEmailRequestDto } from "../dto/request/order.dto";
import { OrderCreateCommand } from "@omega/medical/application/commands/order/order-create.command";
import { OrderCreatedStatusCommand } from "@omega/medical/application/commands/order/order-created-status.command";
import { OrderValidatedStatusCommand } from "@omega/medical/application/commands/order/order-validated-status.command";

@ApiTags('Medical', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-order/write')
export class OrderWriteController {
    constructor(
        @InjectCommand('OrderCreate') private readonly orderCreateCommand: OrderCreateCommand,
        @InjectCommand('OrderSendMail') private readonly orderSendMailCommand: OrderSendMailCommand,
        @InjectCommand('OrderCreatedStatus') private readonly orderCreatedStatusCommand: OrderCreatedStatusCommand,
        @InjectCommand('OrderValidatedStatus') private readonly orderValidatedStatusCommand: OrderValidatedStatusCommand,
    ) { }

    @Post()
    async create(
        @Body() body: OrderCreateRequestDto
    ): Promise<string> {
        await this.orderCreateCommand.handleAsync(body);
        return "ok";
    }

    @Put(':orderId/status-created')
    async createdStatus(
        @Param('orderId') orderId: string
    ): Promise<string> {
        await this.orderCreatedStatusCommand.handleAsync({ orderId });
        return "ok";
    }

    @Put(':orderId/status-validated')
    async validateStatus(
        @Param('orderId') orderId: string
    ): Promise<string> {
        await this.orderValidatedStatusCommand.handleAsync({ orderId });
        return "ok";
    }

    @Post('send-email')
    async sendEmail(
        @Body() body: OrderSendEmailRequestDto
    ): Promise<string> {
        await this.orderSendMailCommand.handleAsync(body);
        return "ok";
    }
}