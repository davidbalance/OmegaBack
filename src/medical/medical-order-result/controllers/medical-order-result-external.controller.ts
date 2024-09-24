import { ApiKeyAuthGuard } from '@/shared/guards/api-key-guard/guards/api-key-auth.guard';
import { Body, Controller, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { PostExternalMedicalResultOrderRequestDto } from '../dtos/request/external-medical-result-order.post.dto';
import { PostExternalMedicalOrderResponseDto } from '../../medical-order/dtos/response/external-medical-order.post.dto';
import { MedicalOrderResultExternalService } from '../services/medical-order-result-external.service';
import { plainToInstance } from 'class-transformer';
import { PostExternalMedicalOrderResultBase64RequestDto } from '../dtos/request/external-medical-result-order-upload-base64.post.dto';

@ApiTags('External Connection', 'Medical>Order')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/medical/order/:source/:key/results')
export class MedicalOrderResultExternalConnectionController {

    constructor(
        @Inject(MedicalOrderResultExternalService) private readonly service: MedicalOrderResultExternalService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExternalMedicalResultOrderRequestDto
    ): Promise<PostExternalMedicalOrderResponseDto> {
        const order = await this.service.create({ source, key }, body);
        return plainToInstance(PostExternalMedicalOrderResponseDto, order);
    }

    @Post('laboratorio/clinico/base64')
    async uploadBase64LaboratorioClinico(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExternalMedicalOrderResultBase64RequestDto
    ): Promise<PostExternalMedicalOrderResponseDto> {
        const order = await this.service.uploadBase64LaboratorioClinico({ source, key }, body);
        return plainToInstance(PostExternalMedicalOrderResponseDto, order);
    }
}
