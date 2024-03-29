import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindOrdersResponseDTO } from '../common/dtos/order.response.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('patient/:dni')
  async findByPatient(
    @Param('patient') patient: string
  ): Promise<FindOrdersResponseDTO> {
    const orders = await this.orderService.findByPatient(patient);
    return { orders };
  }
}
