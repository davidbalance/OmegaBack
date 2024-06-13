import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindOrderFilesResponseDTO, FindOrdersResponseDTO, SendMailRequestDto } from '../common/dtos';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Medical Result')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('files/:id')
  async findFilesById(
    @Param('id') id: number
  ): Promise<FindOrderFilesResponseDTO> {
    const order = await this.orderService.findOrderFilesById(id);
    return plainToInstance(FindOrderFilesResponseDTO, order);
  }


  @UseGuards(JwtAuthGuard)
  @Get('patient/:dni')
  async findByPatient(
    @Param('dni') patient: string
  ): Promise<FindOrdersResponseDTO> {
    const orders = await this.orderService.findByPatient(patient);
    return plainToInstance(FindOrdersResponseDTO, { orders });
  }

  @Post('/mail')
  sendEmail(
    @Body() body: SendMailRequestDto
  ): { message: string } {
    this.orderService.sendMail(body.id);
    return { message: "ok" };
  }
}
