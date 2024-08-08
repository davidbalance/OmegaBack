import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { PatientExternalConnectionService } from "../service/patient-external-connection.service";
import { PostPatientResponseDto } from "../dtos/response/post.patient.response.dto";
import { PatchPatientRequestDto } from "../dtos/request/patch.patient.request.dto";
import { PatchPatientResponseDto } from "../dtos/response/patch.patient.response.dto";
import { PostPatientExternalRequestDto } from "../dtos/request/post.patient-external.request.dto";

@ApiTags('External/Connection', 'User/Patient')
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
        @Body() body: PostPatientExternalRequestDto
    ): Promise<PostPatientResponseDto> {
        const user = await this.service.create(source, body);
        return plainToInstance(PostPatientResponseDto, user);
    }

    @Patch(':dni')
    async findOneAndUpdate(
        @Param('source') _: string,
        @Param('dni') dni: string,
        @Body() body: PatchPatientRequestDto
    ): Promise<PatchPatientResponseDto> {
        const user = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(PatchPatientResponseDto, user);
    }
}