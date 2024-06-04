import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindOrdersResponseDTO, SendMailRequestDto } from '../common/dtos';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Medical Result')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Authorize(ClaimEnum.READ, 'medical-order')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
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
  ): string {
    this.orderService.sendMail(body.id);
    return "ok";
  }
}
