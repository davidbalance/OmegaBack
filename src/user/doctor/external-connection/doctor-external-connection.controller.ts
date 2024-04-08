import {
    Body,
    Controller,
    Inject,
    Param,
    Patch,
    Post,
    UseGuards
} from "@nestjs/common";
import { DoctorExternalConnectionService } from "./doctor-external-connection.service";
import { ApiTags } from "@nestjs/swagger";
import {
    CreateDoctorExternalRequestDTO,
    FindDoctorResponseDTO,
    FindOneDoctorAndUpdateRequestDTO
} from "@/user/common";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/authentication-guard";

@ApiTags('External Connections')
@Controller('doctor-external-connection')
export class DoctorExternalConnectionController {
    constructor(
        @Inject(DoctorExternalConnectionService) private readonly service: DoctorExternalConnectionService
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