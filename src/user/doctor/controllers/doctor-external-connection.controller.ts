import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { DoctorExternalConnectionService } from "../services/doctor-external-connection.service";
import { PATCHDoctorRequestDto, PATCHDoctorResponseDto } from "../dtos/patch.doctor-management.dto";
import { POSTDoctorRequestDto, POSTDoctorResponseDto } from "../dtos/post.doctor-management.dto";

@ApiTags('External/Connection', 'User/Doctor')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/doctor')
export class DoctorExternalConnectionController {
    constructor(
        @Inject(DoctorExternalConnectionService) private readonly service: DoctorExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Body() body: POSTDoctorRequestDto
    ): Promise<POSTDoctorResponseDto> {
        const doctor = await this.service.create(body);
        return plainToInstance(POSTDoctorResponseDto, doctor);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':dni')
    async findOneAndUpddate(
        @Param('dni') dni: string,
        @Body() body: PATCHDoctorRequestDto
    ): Promise<PATCHDoctorResponseDto> {
        const doctor = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(PATCHDoctorResponseDto, doctor);
    }
}