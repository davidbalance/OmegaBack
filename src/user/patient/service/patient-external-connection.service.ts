import { Inject, Injectable } from "@nestjs/common";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PatientEventService } from "./patient-event.service";
import { PatientManagementService } from "./patient-management.service";
import { PostExternalPatientRequestDto } from "../dtos/request/external-patient.post.dto";
import { PatchExternalPatientRequestDto } from "../dtos/request/external-patient.patch.dto";
import { ExternalPatient } from "../dtos/response/external-patient.base.dto";

type ConnectionRequestType = PostExternalPatientRequestDto | PatchExternalPatientRequestDto

@Injectable()
export class PatientExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, ExternalPatient> {
    constructor(
        @Inject(PatientManagementService) private readonly service: PatientManagementService,
        @Inject(PatientEventService) private readonly eventService: PatientEventService
    ) { }

    async create(source: string, { jobPosition, ...data }: PostExternalPatientRequestDto): Promise<ExternalPatient> {
        const patient = await this.service.create(data);
        this.eventService.emitMedicalClientExternalCreateEvent(source, data, jobPosition);
        return patient;
    }

    async findOne(dni: string): Promise<ExternalPatient> {
        return await this.service.findOneByDni(dni);
    }

    async findOneOrCreate(source: string, data: PostExternalPatientRequestDto): Promise<ExternalPatient> {
        try {
            return await this.service.findOneByDni(data.dni);
        } catch (error) {
            return await this.create(source, data);
        }
    }

    async findOneAndUpdate(dni: string, data: PatchExternalPatientRequestDto): Promise<ExternalPatient> {
        return await this.service.updateOne(dni, data);
    }
}