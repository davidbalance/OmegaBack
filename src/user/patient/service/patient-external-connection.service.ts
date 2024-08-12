import { Inject, Injectable } from "@nestjs/common";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PatchPatientRequestDto } from "../dtos/request/patch.patient.request.dto";
import { PatientResponseDto } from "../dtos/response/base.patient.response.dto";
import { PatientEventService } from "./patient-event.service";
import { PatientManagementService } from "./patient-management.service";
import { PostPatientExternalRequestDto } from "../dtos/request/post.patient-external.request.dto";

type ConnectionRequestType = PostPatientExternalRequestDto | PatchPatientRequestDto

@Injectable()
export class PatientExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, PatientResponseDto> {
    constructor(
        @Inject(PatientManagementService) private readonly service: PatientManagementService,
        @Inject(PatientEventService) private readonly eventService: PatientEventService
    ) { }

    async create(source: string, { jobPosition, ...data }: PostPatientExternalRequestDto): Promise<PatientResponseDto> {
        const patient = await this.service.create(data);
        this.eventService.emitMedicalClientExternalCreateEvent(source, data, jobPosition);
        return patient;
    }

    async findOne(dni: string): Promise<PatientResponseDto> {
        return await this.service.findOneByDni(dni);
    }

    async findOneOrCreate(source: string, data: PostPatientExternalRequestDto): Promise<PatientResponseDto> {
        try {
            return await this.service.findOneByDni(data.dni);
        } catch (error) {
            return await this.create(source, data);
        }
    }

    async findOneAndUpdate(dni: string, data: PatchPatientRequestDto): Promise<PatientResponseDto> {
        return await this.service.updateOne(dni, data);
    }
}