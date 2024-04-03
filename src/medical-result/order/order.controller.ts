import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindOrdersResponseDTO } from '../common/dtos';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medical Result')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('patient/:dni')
  async findByPatient(
    @Param('patient') patient: string
  ): Promise<FindOrdersResponseDTO> {
    const orders = await this.orderService.findByPatient(patient);
    return plainToInstance(FindOrdersResponseDTO, { orders });
  }
}
