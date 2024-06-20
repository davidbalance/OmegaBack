import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ExternalConnectionService } from "../service/external-connection.service";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { PATCHPatientRequestDto, POSTPatientRequestDto } from "../dtos/patient.request.dto";
import { PATCHPatientResponseDto, POSTPatientResponseDto } from "../dtos/patient.response.dto";

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
        @Body() body: POSTPatientRequestDto
    ): Promise<POSTPatientResponseDto> {
        const user = await this.service.create(body);
        return plainToInstance(POSTPatientResponseDto, user);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':dni')
    async findOneAndUpdate(
        @Param('dni') dni: string,
        @Body() body: PATCHPatientRequestDto
    ): Promise<PATCHPatientResponseDto> {
        const user = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(PATCHPatientResponseDto, user);
    }
}