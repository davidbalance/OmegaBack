import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { PatientExternalConnectionService } from "../service/patient-external-connection.service";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExternalPatientRequestDto } from "../dtos/request/external-patient.post.dto";
import { PatchExternalPatientRequestDto } from "../dtos/request/external-patient.patch.dto";
import { PostExternalPatientResponseDto } from "../dtos/response/external-patient.post.dto";
import { PatchExternalPatientResponseDto } from "../dtos/response/external-patient.patch.dto";

@ApiTags('External Connection', 'User>Patient')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/patients/:source')
export class PatientExternalConnectionController {
    constructor(
        @Inject(PatientExternalConnectionService) private readonly service: PatientExternalConnectionService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Body() body: PostExternalPatientRequestDto
    ): Promise<PostExternalPatientResponseDto> {
        const user = await this.service.create(source, body);
        return plainToInstance(PostExternalPatientResponseDto, user);
    }

    @Patch(':dni')
    async findOneAndUpdate(
        @Param('source') _: string,
        @Param('dni') dni: string,
        @Body() body: PatchExternalPatientRequestDto
    ): Promise<PatchExternalPatientResponseDto> {
        const user = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(PatchExternalPatientResponseDto, user);
    }
}