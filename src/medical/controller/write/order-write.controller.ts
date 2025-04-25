import { Body, Controller, Delete, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectCommand } from "@omega/medical/nest/inject/command.inject";
import { OrderSendMailCommand } from "@omega/medical/application/commands/order/order-send-mail.command";
import { OrderCreateRequestDto, OrderSendEmailRequestDto } from "../dto/request/order.dto";
import { OrderCreateCommand } from "@omega/medical/application/commands/order/order-create.command";
import { OrderCreatedStatusCommand } from "@omega/medical/application/commands/order/order-created-status.command";
import { OrderValidatedStatusCommand } from "@omega/medical/application/commands/order/order-validated-status.command";
import { OrderRemoveCommand } from "@omega/medical/application/commands/order/order-remove.command";
import { FileInterceptor } from "@nestjs/platform-express";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { OrderMassiveLoadSpreadSheetMapper } from "../mapper/order-massive-load.spreadsheet-mapper";
import { OrderMassiveLoadSpreadSheetValidator } from "../validator/order-massive-load.spreadsheet-validator";
import { OrderCreateManyCommand } from "@omega/medical/application/commands/order/order-create-many.command";

@ApiTags('Medical', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-order/write')
export class OrderWriteController {
    constructor(
        @InjectCommand('OrderCreate') private readonly orderCreateCommand: OrderCreateCommand,
        @InjectCommand('OrderRemove') private readonly orderRemoveCommand: OrderRemoveCommand,
        @InjectCommand('OrderSendMail') private readonly orderSendMailCommand: OrderSendMailCommand,
        @InjectCommand('OrderCreatedStatus') private readonly orderCreatedStatusCommand: OrderCreatedStatusCommand,
        @InjectCommand('OrderValidatedStatus') private readonly orderValidatedStatusCommand: OrderValidatedStatusCommand,
        @InjectCommand('OrderCreateMany') private readonly orderCreateManyCommand: OrderCreateManyCommand,
        @InjectSpreadSheet() private readonly spreadsheet: SpreadsheetProvider
    ) { }

    @Post()
    async create(
        @Body() body: OrderCreateRequestDto
    ): Promise<string> {
        await this.orderCreateCommand.handleAsync(body);
        return "ok";
    }

    @Delete(':orderId')
    async remove(
        @Param('orderId') orderId: string
    ): Promise<string> {
        await this.orderRemoveCommand.handleAsync({ orderId });
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

    @Post('massive-load/excel')
    @UseInterceptors(FileInterceptor('file'))
    async massiveLoadFromExcel(
        @UploadedFile() file: Express.Multer.File
    ): Promise<string> {
        const data = await this.spreadsheet.read(file.buffer);
        const examTypes = data[0].slice(10);
        const examSubtypes = data[1].slice(10);
        const exams = data[2].slice(10);
        const parsed = data.slice(3).map(e => OrderMassiveLoadSpreadSheetMapper.toDTO(e.slice(1), examTypes, examSubtypes, exams));
        const promises = parsed.map((async (e) => await OrderMassiveLoadSpreadSheetValidator.validate(e)));
        await Promise.all(promises);
        await this.orderCreateManyCommand.handleAsync({ data: parsed });
        return "ok";
    }
}