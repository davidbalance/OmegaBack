import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { PatientExternalConnectionService } from "../service/patient-external-connection.service";
import { PATCHPatientRequestDto, PATCHPatientResponseDto } from "../dtos/patch.patient-management.dto";
import { POSTPatientRequestDto, POSTPatientResponseDto } from "../dtos/post.patient-management,dto";

@ApiTags('External/Connection', 'User/Patient')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/patients')
export class PatientExternalConnectionController {
    constructor(
        @Inject(PatientExternalConnectionService) private readonly service: PatientExternalConnectionService
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