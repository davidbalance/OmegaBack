import { UseGuards, Controller, Inject, Get, Param, Post, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalOrderExternalConnectionService } from "../services/medical-order-external-connection.service";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExternalMedicalOrderRequestDto } from "../dtos/request/external-medical-order.post.dto";
import { PostExternalMedicalOrderResponseDto } from "../dtos/response/external-medical-order.post.dto";
import { GetExternalMedicalOrderArrayResponseDto } from "../dtos/response/external-medical-order-array.get.dto";
import { GetExternalMedicalOrderResponseDto } from "../dtos/response/external-medical-order.get.dto";
import { PatchExternalMedicalOrderRequestDto } from "../dtos/request/external-medical-order.patch.dto";
import { PatchExternalMedicalOrderResponseDto } from "../dtos/response/external-medical-order.patch.dto";

@ApiTags('External Connection', 'Medical>Order')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/medical/orders')
export class MedicalOrderExternalConnectionController {
    constructor(
        @Inject(MedicalOrderExternalConnectionService) private readonly service: MedicalOrderExternalConnectionService,
    ) { }

    @Post(':source/:key')
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExternalMedicalOrderRequestDto
    ): Promise<PostExternalMedicalOrderResponseDto> {
        const order = await this.service.create({ source, key }, body);
        return plainToInstance(PostExternalMedicalOrderResponseDto, order);
    }

    @Get('dni/:dni')
    async findAllByPatient(
        @Param('dni') dni: string,
    ): Promise<GetExternalMedicalOrderArrayResponseDto> {
        const data = await this.service.find(dni);
        return plainToInstance(GetExternalMedicalOrderArrayResponseDto, { data });
    }

    @Get(':source/:key')
    async findOneByExternalKey(
        @Param('source') source: string,
        @Param('key') key: string,
    ): Promise<GetExternalMedicalOrderResponseDto> {
        const order = await this.service.findOne({ key, source });
        return plainToInstance(GetExternalMedicalOrderResponseDto, order);
    }
    
    @Get(':id')
    async findOneById(
        @Param('id') id: number,
    ): Promise<GetExternalMedicalOrderResponseDto> {
        const order = await this.service.findOne(id);
        return plainToInstance(GetExternalMedicalOrderResponseDto, order);
    }

    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExternalMedicalOrderRequestDto
    ): Promise<PatchExternalMedicalOrderResponseDto> {
        const order = await this.service.findOneAndUpdate({ key: key, source: source }, body);
        return plainToInstance(PatchExternalMedicalOrderResponseDto, order);
    }
}