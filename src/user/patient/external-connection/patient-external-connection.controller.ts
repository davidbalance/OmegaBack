import { Body, Controller, Inject, Param, Patch, Post } from "@nestjs/common";
import { PatientExternalConnectionService } from "./patient-external-connection.service";
import { ApiTags } from "@nestjs/swagger";
import { CreatePatientExternalRequestDTO, FindOnePatientAndUpdateRequestDTO, FindPatientResponseDTO } from "@/user/common";
import { plainToInstance } from "class-transformer";

@ApiTags('External Connections')
@Controller('patient-external-connection')
export class PatientExternalConnectionController {
    constructor(
        @Inject(PatientExternalConnectionService) private readonly service: PatientExternalConnectionService
    ) { }

    @Post()
    async create(
        @Body() body: CreatePatientExternalRequestDTO
    ): Promise<FindPatientResponseDTO> {
        const user = await this.service.create(body);
        return plainToInstance(FindPatientResponseDTO, user);
    }

    @Patch(':id')
    async findOneAndUpdate(
        @Param('id') id: number,
        @Body() body: FindOnePatientAndUpdateRequestDTO
    ): Promise<FindPatientResponseDTO> {
        const user = await this.service.findOneAndUpdate(id, body);
        return plainToInstance(FindPatientResponseDTO, user);
    }
}