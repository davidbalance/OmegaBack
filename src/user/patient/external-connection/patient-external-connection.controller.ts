import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PatientExternalConnectionService } from "./patient-external-connection.service";
import { ApiTags } from "@nestjs/swagger";
import { CreatePatientExternalRequestDTO, FindOnePatientAndUpdateRequestDTO, FindPatientResponseDTO } from "@/user/common";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/authentication-guard";

@ApiTags('External Connections')
@Controller('patient-external-connection')
export class PatientExternalConnectionController {
    constructor(
        @Inject(PatientExternalConnectionService) private readonly service: PatientExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Body() body: CreatePatientExternalRequestDTO
    ): Promise<FindPatientResponseDTO> {
        const user = await this.service.create(body);
        return plainToInstance(FindPatientResponseDTO, user);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':dni')
    async findOneAndUpdate(
        @Param('dni') dni: string,
        @Body() body: FindOnePatientAndUpdateRequestDTO
    ): Promise<FindPatientResponseDTO> {
        const user = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(FindPatientResponseDTO, user);
    }
}