import { Controller, Get, Param, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalOrderCloudService } from "../services/medical-order-cloud.service";
import { GETMedicalOrderCloudResponseDto } from "../dtos/get.medical-order-cloud.dto";

@ApiTags('Medical/Order')
@ApiBearerAuth()
@Controller('medical/orders/cloud')
export class MedicalOrderCloudController {
  constructor(
    @Inject(MedicalOrderCloudService) private readonly service: MedicalOrderCloudService
  ) { }

  @Get(':id')
  async findFilesById(
    @Param('id') id: number
  ): Promise<GETMedicalOrderCloudResponseDto> {
    const order = await this.service.findOne(id);
    return plainToInstance(GETMedicalOrderCloudResponseDto, order);
  }
}
