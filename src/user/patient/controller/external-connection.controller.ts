import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ExternalConnectionService } from "../service/external-connection.service";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { CreatePatientExternalRequestDTO, FindOnePatientAndUpdateRequestDTO, FindPatientResponseDTO } from "@/user/common";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";

@ApiTags('External/Connection', 'User/Patient')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/patients')
export class PatientExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
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