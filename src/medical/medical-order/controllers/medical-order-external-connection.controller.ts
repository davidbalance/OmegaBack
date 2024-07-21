import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { UseGuards, Controller, Inject, Get, Param, Post, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalOrderExternalConnectionService } from "../services/medical-order-external-connection.service";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { GETMedicalOrderExternalConnectionResponseDto, GETMedicalOrderArrayExternalConnectionResponseDto } from "../dtos/medical-order-external-connection.dto";
import { PATCHMedicalOrderProcessRequestDto } from "../dtos/patch.medical-order-external-connection.dto";
import { POSTMedicalOrderWithExternalKeyRequestDto } from "../dtos/post.medical-order-external-connection.dto";

@ApiTags('External/Connection', 'Medical/Order')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/medical/order')
export class MedicalOrderExternalConnectionController {
    constructor(
        @Inject(MedicalOrderExternalConnectionService) private readonly service: MedicalOrderExternalConnectionService,
        @Inject(MedicalOrderManagementService) private readonly mangamentService: MedicalOrderManagementService,
    ) { }

    @Post()
    async create(
        @Body() body: POSTMedicalOrderWithExternalKeyRequestDto
    ): Promise<GETMedicalOrderExternalConnectionResponseDto> {
        const order = await this.service.create(body);
        return plainToInstance(GETMedicalOrderExternalConnectionResponseDto, order);
    }

    @Get('dni/:dni')
    async findAllByPatient(
        @Param('dni') dni: string,
    ): Promise<GETMedicalOrderArrayExternalConnectionResponseDto> {
        const orders = await this.mangamentService.findAllByPatient(dni);
        return plainToInstance(GETMedicalOrderArrayExternalConnectionResponseDto, { orders });
    }

    @Get(':source/:key')
    async findOne(
        @Param('source') source: string,
        @Param('key') key: string,
    ): Promise<GETMedicalOrderExternalConnectionResponseDto> {
        const order = await this.service.findOne({ key, source });
        return plainToInstance(GETMedicalOrderExternalConnectionResponseDto, order);
    }

    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHMedicalOrderProcessRequestDto
    ): Promise<GETMedicalOrderExternalConnectionResponseDto> {
        const order = await this.service.findOneAndUpdate({ key: key, source: source }, body);
        return plainToInstance(GETMedicalOrderExternalConnectionResponseDto, order);
    }
}