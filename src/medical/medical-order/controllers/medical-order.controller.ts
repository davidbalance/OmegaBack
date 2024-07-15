import { Body, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { MedicalOrderService } from '../services/medical-order.service';
import { GETMedicalOrderArrayResponseDto, GETMedicalOrderArrayWithPageCountResponseDto, GETMedicalOrderFilesResponseDto, GETMedicalOrderResponseDto, GETPlainMedicalOrderArrayWithPageCountResponseDto } from '../dtos/medical-order.response.dto';
import { GETMedicalOrderByFilterAndPaginationRequestDto, POSTMailRequestDto } from '../dtos/medical-order.request.dto';
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
  @Get('company/:ruc')
  async findByRuc(
    @Param('ruc') ruc: string
  ): Promise<GETMedicalOrderArrayResponseDto> {
    const orders = await this.orderService.findByCompany(ruc);
    return plainToInstance(GETMedicalOrderArrayResponseDto, { orders });
  }

  @Post('paginate')
  async findByFilterAndPagination(
    @Body() { page, filter, limit, order }: GETMedicalOrderByFilterAndPaginationRequestDto
  ): Promise<GETPlainMedicalOrderArrayWithPageCountResponseDto> {
    const orders = await this.orderService.findByFilterAndPagination(page, limit, filter, order);
    const pages = await this.orderService.findByPageCount(limit, filter);
    return plainToInstance(GETPlainMedicalOrderArrayWithPageCountResponseDto, { pages, orders });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('order/:id/status/validate')
  async findOneAndValidateStatus(
    @Param('id') id: number
  ): Promise<GETMedicalOrderResponseDto> {
    const order = await this.orderService.findOneUpdateStatus(id, OrderStatus.VALIDATED);
    return plainToInstance(GETMedicalOrderResponseDto, order);
  }

  @Post('mail')
  sendEmail(
    @Body() body: POSTMailRequestDto
  ): { message: string } {
    this.orderService.sendMail(body.order, body.mail);
    return { message: "ok" };
  }
}
