import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PatientEvent, PatientExternalCreateEvent } from "@/shared/events/patient.event";
import { PatientManagementService } from "../service/patient-management.service";

@Injectable()
export class PatientExternalListener {
    constructor(
        @Inject(PatientManagementService) private readonly service: PatientManagementService
    ) { }

    @OnEvent(PatientEvent.EXTERNAL_CREATE)
    async onExternalCreate({ data }: PatientExternalCreateEvent): Promise<void> {
        try {
            await this.service.findOneByDni(data.dni)
        } catch (error) {
            await this.service.create(data);
        }
    }
}