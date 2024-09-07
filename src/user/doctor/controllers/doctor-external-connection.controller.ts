import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DoctorExternalConnectionService } from "../services/doctor-external-connection.service";
import { PostDoctorRequestDto } from "../dtos/request/doctor.post.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExternalDoctorResponseDto } from "../dtos/response/external-doctor.post.dto";
import { PatchExternalDoctorResponseDto } from "../dtos/response/external-doctor.patch.dto";
import { PatchDoctorRequestDto } from "../dtos/request/doctor.patch.dto";

@ApiTags('External Connection', 'User>Doctor')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/doctor')
export class DoctorExternalConnectionController {
    constructor(
        @Inject(DoctorExternalConnectionService) private readonly service: DoctorExternalConnectionService
    ) { }

    @Post()
    async create(
        @Body() body: PostDoctorRequestDto
    ): Promise<PostExternalDoctorResponseDto> {
        const doctor = await this.service.create(body);
        return plainToInstance(PostExternalDoctorResponseDto, doctor);
    }

    @Patch(':dni')
    async findOneAndUpddate(
        @Param('dni') dni: string,
        @Body() body: PatchDoctorRequestDto
    ): Promise<PatchExternalDoctorResponseDto> {
        const doctor = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(PatchExternalDoctorResponseDto, doctor);
    }
}