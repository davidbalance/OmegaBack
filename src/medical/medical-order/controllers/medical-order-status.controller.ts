import { Controller, Param, UseGuards, Patch, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { OrderStatus } from "../enums";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical/Order')
@ApiBearerAuth()
@Controller('medical/orders/:id/status')
@UseGuards(JwtAuthGuard)
export class MedicalOrderStatusController {
  constructor(
    @Inject(MedicalOrderManagementService) private readonly service: MedicalOrderManagementService
  ) { }

  @Patch('validate')
  async findOneAndValidateStatus(
    @Param('id') id: number
  ): Promise<any> {
    await this.service.updateOne(id, { orderStatus: OrderStatus.VALIDATED });
    return {}
  }

  @Patch('created')
  async findOneAndCratedStatus(
    @Param('id') id: number
  ): Promise<any> {
    await this.service.updateOne(id, { orderStatus: OrderStatus.CREATED });
    return {}
  }
}
