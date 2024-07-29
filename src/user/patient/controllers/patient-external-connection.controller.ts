import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { PatientExternalConnectionService } from "../service/patient-external-connection.service";
import { PostPatientRequestDto } from "../dtos/request/post.patient.request.dto";
import { PostPatientResponseDto } from "../dtos/response/post.patient.response.dto";
import { PatchPatientRequestDto } from "../dtos/request/patch.patient.request.dto";
import { PatchPatientResponseDto } from "../dtos/response/patch.patient.response.dto";

@ApiTags('External/Connection', 'User/Patient')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/patients')
export class PatientExternalConnectionController {
    constructor(
        @Inject(PatientExternalConnectionService) private readonly service: PatientExternalConnectionService
    ) { }

    @Post()
    async create(
        @Body() body: PostPatientRequestDto
    ): Promise<PostPatientResponseDto> {
        const user = await this.service.create(body);
        return plainToInstance(PostPatientResponseDto, user);
    }

    @Patch(':dni')
    async findOneAndUpdate(
        @Param('dni') dni: string,
        @Body() body: PatchPatientRequestDto
    ): Promise<PatchPatientResponseDto> {
        const user = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(PatchPatientResponseDto, user);
    }
}