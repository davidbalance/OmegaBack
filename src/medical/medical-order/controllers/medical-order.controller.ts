import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { MedicalOrderService } from '../services/medical-order.service';
import { GETMedicalOrderArrayResponseDto, GETMedicalOrderFilesResponseDto } from '../dtos/medical-order.response.dto';
import { POSTMailRequestDto } from '../dtos/medical-order.request.dto';

@ApiTags('Medical/Order')
@ApiBearerAuth()
@Controller('medical/orders')
export class MedicalOrderController {
  constructor(private readonly orderService: MedicalOrderService) { }

  @Get('files/:id')
  async findFilesById(
    @Param('id') id: number
  ): Promise<GETMedicalOrderFilesResponseDto> {
    const order = await this.orderService.findOrderFilesById(id);
    return plainToInstance(GETMedicalOrderFilesResponseDto, order);
  }

  @UseGuards(JwtAuthGuard)
  @Get('patient/:dni')
  async findByPatient(
    @Param('dni') patient: string
  ): Promise<GETMedicalOrderArrayResponseDto> {
    const orders = await this.orderService.findByPatient(patient);
    return plainToInstance(GETMedicalOrderArrayResponseDto, { orders });
  }

  @Post('/mail')
  sendEmail(
    @Body() body: POSTMailRequestDto
  ): { message: string } {
    this.orderService.sendMail(body.id);
    return { message: "ok" };
  }
}
