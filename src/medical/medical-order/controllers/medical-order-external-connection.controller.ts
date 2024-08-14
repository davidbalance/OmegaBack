import { UseGuards, Controller, Inject, Get, Param, Post, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalOrderExternalConnectionService } from "../services/medical-order-external-connection.service";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { PostMedicalOrderResponseDto } from "../dtos/response/post.medical-order.response.dto";
import { GetMedicalOrderArrayResponseDto } from "../dtos/response/get.medical-order-array.response.dto";
import { GetMedicalOrderResponseDto } from "../dtos/response/get.medical-order.response.dto";
import { PatchMedicalOrderRequestDto } from "../dtos/request/patch.medical-order.request.dto";
import { PatchMedicalOrderResponseDto } from "../dtos/response/patch.medical-order.response.dto";
import { PostMedicalOrderExternalRequestDto } from "../dtos/request/post.medical-order-external.request.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";

@ApiTags('External/Connection', 'Medical/Order')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/medical/orders')
export class MedicalOrderExternalConnectionController {
    constructor(
        @Inject(MedicalOrderExternalConnectionService) private readonly service: MedicalOrderExternalConnectionService,
        @Inject(MedicalOrderManagementService) private readonly mangamentService: MedicalOrderManagementService,
    ) { }

    @Post(':source/:key')
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostMedicalOrderExternalRequestDto
    ): Promise<PostMedicalOrderResponseDto> {
        const order = await this.service.create({ source, key }, body);
        return plainToInstance(PostMedicalOrderResponseDto, order);
    }

    @Get('dni/:dni')
    async findAllByPatient(
        @Param('dni') dni: string,
    ): Promise<GetMedicalOrderArrayResponseDto> {
        const data = await this.mangamentService.findAllByPatient(dni);
        return plainToInstance(GetMedicalOrderArrayResponseDto, { data });
    }

    @Get(':source/:key')
    async findOne(
        @Param('source') source: string,
        @Param('key') key: string,
    ): Promise<GetMedicalOrderResponseDto> {
        const order = await this.service.findOne({ key, source });
        return plainToInstance(GetMedicalOrderResponseDto, order);
    }

    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchMedicalOrderRequestDto
    ): Promise<PatchMedicalOrderResponseDto> {
        const order = await this.service.findOneAndUpdate({ key: key, source: source }, body);
        return plainToInstance(PatchMedicalOrderResponseDto, order);
    }
}