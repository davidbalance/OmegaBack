import { User } from "@/shared/decorator";
import { DniInterceptor } from "@/shared/interceptors/dni/dni.interceptor";
import { Controller, Get, Param, UseGuards, UseInterceptors, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { GetMedicalOrderArrayResponseDto } from "../dtos/response/get.medical-order-array.response.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

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
  ): Promise<GetMedicalOrderArrayResponseDto> {
    const data = await this.service.findAllByPatient(patient);
    return plainToInstance(GetMedicalOrderArrayResponseDto, { data });
  }

  @UseInterceptors(DniInterceptor)
  @Get('patient/:dni/doctor')
  async findByPatientAndDoctor(
    @Param('dni') patient: string,
    @User() doctor: string
  ): Promise<GetMedicalOrderArrayResponseDto> {
    const data = await this.service.findAllByPatientAndDoctor(patient, doctor);
    return plainToInstance(GetMedicalOrderArrayResponseDto, { data });
  }
}
