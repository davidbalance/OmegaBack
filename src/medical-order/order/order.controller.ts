import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestDTO } from 'src/shared';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderRequestDTO) {
    return this.orderService.create(createOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneByID(+id);
  }
}
