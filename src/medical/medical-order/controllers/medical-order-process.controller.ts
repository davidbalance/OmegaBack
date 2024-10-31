import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MedicalOrderProcessService } from "../services/medical-order-process.service";
import { plainToInstance } from "class-transformer";
import { GetMedicalOrderProcessArrayDto } from "../dtos/response/medical-order-process-array.dto";

@ApiTags('Medical>Order>Process')
@ApiBearerAuth()
@Controller('medical/orders/processes')
@UseGuards(JwtAuthGuard)
export class MedicalOrderProcessController {
    constructor(
        @Inject(MedicalOrderProcessService) private readonly service: MedicalOrderProcessService
    ) { }

    @Get()
    async find(): Promise<GetMedicalOrderProcessArrayDto> {
        const data = await this.service.retriveProcesses();
        return plainToInstance(GetMedicalOrderProcessArrayDto, { data });
    }
}