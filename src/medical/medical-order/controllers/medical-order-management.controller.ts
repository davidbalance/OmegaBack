import { User } from "@/shared/decorator";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { DniInterceptor } from "@/shared/interceptors/dni/dni.interceptor";
import { Controller, Get, Param, UseGuards, UseInterceptors, Patch, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { OrderStatus } from "../enums";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { GETMedicalOrderArrayResponseDto, GETMedicalOrderResponseDto } from "../dtos/get.medical-order.response.dto";

@ApiTags('Medical/Order')
@ApiBearerAuth()
@Controller('medical/orders')
@UseGuards(JwtAuthGuard)
export class MedicalOrderManagementController {
  constructor(
    @Inject(MedicalOrderManagementService) private readonly service: MedicalOrderManagementService
  ) { }

  @Get('patient/:dni')
  async findByPatient(
    @Param('dni') patient: string
  ): Promise<GETMedicalOrderArrayResponseDto> {
    const orders = await this.service.findAllByPatient(patient);
    return plainToInstance(GETMedicalOrderArrayResponseDto, { orders });
  }

  @UseInterceptors(DniInterceptor)
  @Get('patient/:dni/doctor')
  async findByPatientAndDoctor(
    @Param('dni') patient: string,
    @User() doctor: string
  ): Promise<GETMedicalOrderArrayResponseDto> {
    const orders = await this.service.findAllByPatientAndDoctor(patient, doctor);
    return plainToInstance(GETMedicalOrderArrayResponseDto, { orders });
  }

  @Patch(':id/status/validate')
  async findOneAndValidateStatus(
    @Param('id') id: number
  ): Promise<GETMedicalOrderResponseDto> {
    const order = await this.service.updateOne(id, { orderStatus: OrderStatus.VALIDATED });
    return plainToInstance(GETMedicalOrderResponseDto, order);
  }
}
