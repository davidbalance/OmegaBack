import { Body, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { MedicalOrderService } from '../services/medical-order.service';
import { GETMedicalOrderArrayResponseDto, GETMedicalOrderFilesResponseDto } from '../dtos/medical-order.response.dto';
import { POSTMailRequestDto } from '../dtos/medical-order.request.dto';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';
import { User } from '@/shared/decorator';
import { OrderStatus } from '../enums';

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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(DniInterceptor)
  @Get('patient/:dni/doctor')
  async findByPatientAndDoctor(
    @Param('dni') patient: string,
    @User() doctor: string
  ): Promise<GETMedicalOrderArrayResponseDto> {
    const orders = await this.orderService.findByPatientAndDoctor(patient, doctor);
    return plainToInstance(GETMedicalOrderArrayResponseDto, { orders });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(DniInterceptor)
  @Patch('order/:id/status/validate')
  async findOneAndValidateStatus(
    @Param('id') id: number
  ): Promise<GETMedicalOrderArrayResponseDto> {
    const orders = await this.orderService.findOneUpdateStatus(id, OrderStatus.VALIDATED);
    return plainToInstance(GETMedicalOrderArrayResponseDto, { orders });
  }

  @Post('mail')
  sendEmail(
    @Body() body: POSTMailRequestDto
  ): { message: string } {
    this.orderService.sendMail(body.order, body.mail);
    return { message: "ok" };
  }
}
