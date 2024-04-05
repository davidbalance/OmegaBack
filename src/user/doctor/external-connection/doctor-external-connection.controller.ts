import {
    Body,
    Controller,
    Inject,
    Param,
    Patch,
    Post
} from "@nestjs/common";
import { DoctorExternalConnectionService } from "./doctor-external-connection.service";
import { ApiTags } from "@nestjs/swagger";
import {
    CreateDoctorExternalRequestDTO,
    FindDoctorResponseDTO,
    FindOneDoctorAndUpdateRequestDTO
} from "@/user/common";
import { plainToInstance } from "class-transformer";

@ApiTags('External Connections')
@Controller('doctor-external-connection')
export class DoctorExternalConnectionController {
    constructor(
        @Inject(DoctorExternalConnectionService) private readonly service: DoctorExternalConnectionService
    ) { }

    @Post()
    async create(
        @Body() body: CreateDoctorExternalRequestDTO
    ): Promise<FindDoctorResponseDTO> {
        const doctor = await this.service.create(body);
        return plainToInstance(FindDoctorResponseDTO, doctor);
    }

    @Patch(':id')
    async findOneAndUpddate(
        @Param('id') id: number,
        @Body() body: FindOneDoctorAndUpdateRequestDTO
    ): Promise<FindDoctorResponseDTO> {
        const doctor = await this.service.findOneAndUpdate(id, body);
        return plainToInstance(FindDoctorResponseDTO, doctor);
    }
}