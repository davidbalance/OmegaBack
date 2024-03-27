import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindOrderResponseDTO } from '@/shared/dtos/order.response.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  async find(): Promise<FindOrderResponseDTO> {
    const orders = await this.orderService.find();
    return { orders };
  }
}
