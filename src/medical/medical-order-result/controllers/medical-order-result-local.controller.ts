import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { MedicalOrderResultLocalService } from '../services/medical-order-result-local.service';
import { PostLocalMedicalResultOrderRequestDto } from '../dtos/request/local-medical-result-order.post.dto';

@ApiTags('Medical>Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/order/results')
export class MedicalOrderResultLocalController {

    constructor(
        @Inject(MedicalOrderResultLocalService) private readonly service: MedicalOrderResultLocalService
    ) { }

    @Post()
    async create(
        @Body() body: PostLocalMedicalResultOrderRequestDto
    ): Promise<any> {
        await this.service.create(body);
        return "";
    }
}
