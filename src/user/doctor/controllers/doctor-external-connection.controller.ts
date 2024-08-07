import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { DoctorExternalConnectionService } from "../services/doctor-external-connection.service";
import { PostDoctorRequestDto } from "../dtos/request/post.doctor.dto";
import { PostDoctorResponseDto } from "../dtos/response/post.doctor.response.dto";
import { PatchDoctorRequestDto } from "../dtos/request/patch.doctor.request.dto";
import { PatchDoctorResponseDto } from "../dtos/response/patch.doctor.response.dto";

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
        @Body() body: PostDoctorRequestDto
    ): Promise<PostDoctorResponseDto> {
        const doctor = await this.service.create(body);
        return plainToInstance(PostDoctorResponseDto, doctor);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':dni')
    async findOneAndUpddate(
        @Param('dni') dni: string,
        @Body() body: PatchDoctorRequestDto
    ): Promise<PatchDoctorResponseDto> {
        const doctor = await this.service.findOneAndUpdate(dni, body);
        return plainToInstance(PatchDoctorResponseDto, doctor);
    }
}