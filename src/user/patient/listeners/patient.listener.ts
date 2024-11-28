import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PatientEvent, PatientLocalCreateEvent } from "@/shared/events/patient.event";
import { PatientManagementService } from "../service/patient-management.service";

@Injectable()
export class PatientListener {
    constructor(
        @Inject(PatientManagementService) private readonly service: PatientManagementService
    ) { }

    @OnEvent(PatientEvent.LOCAL_CREATE)
    async onCreateEvent({ data }: PatientLocalCreateEvent): Promise<void> {
        try {
            await this.service.findOneByDni(data.dni)
        } catch (error) {
            await this.service.create(data);
        }
    }
}