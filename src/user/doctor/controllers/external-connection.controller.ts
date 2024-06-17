import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { CreateDoctorExternalRequestDTO, FindDoctorResponseDTO, FindOneDoctorAndUpdateRequestDTO } from "@/user/common";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { ExternalConnectionService } from "../services/external-connection.service";

@ApiTags('External/Connection', 'User/Doctor')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/doctor')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Body() body: CreateDoctorExternalRequestDTO
    ): Promise<FindDoctorResponseDTO> {
        const doctor = await this.service.create(body);
        return plainToInstance(FindDoctorResponseDTO, doctor);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':dni')
    async findOneAndUpddate(
        @Param('dni') dni: string,
        @Body() body: FindOneDoctorAndUpdateRequestDTO
    ): Promise<FindDoctorResponseDTO> {
        const doctor = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(FindDoctorResponseDTO, doctor);
    }
}