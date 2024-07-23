import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PatientExternalConnectionService } from "../service/patient-external-connection.service";
import { PatientEvent, PatientExternalCreateEvent } from "@/shared/events/patient.event";

@Injectable()
export class PatientExternalListener {
    constructor(
        @Inject(PatientExternalConnectionService) private readonly service: PatientExternalConnectionService
    ) { }

    @OnEvent(PatientEvent.EXTERNAL_CREATE)
    async onExternalCreate({ data }: PatientExternalCreateEvent): Promise<void> {
        await this.service.findOneOrCreate(data);
    }
}