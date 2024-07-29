import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DoctorExternalConnectionService } from "../services/doctor-external-connection.service";
import { MedicalResultEvent, MedicalResultFindOrCreateDoctorEvent } from "@/shared/events";

@Injectable()
export class MedicalResultDoctorListener {
    constructor(
        @Inject(DoctorExternalConnectionService) private readonly externalService: DoctorExternalConnectionService
    ) { }

    @OnEvent(MedicalResultEvent.FIND_OR_CREATE_DOCTOR)
    async findOrCreate({ findOrCreateEvent }: MedicalResultFindOrCreateDoctorEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}