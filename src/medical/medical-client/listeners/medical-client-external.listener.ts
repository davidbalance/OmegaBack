import { Inject, Injectable } from "@nestjs/common";
import { MedicalClientManagementService } from "../services/medical-client-management.service";
import { OnEvent } from "@nestjs/event-emitter";
import { MedicalClientEvent, MedicalClientExternalCreateEvent } from "@/shared/events/medical-client.event";
import { MedicalClientJobPositionService } from "../services/medical-client-job-position.service";
import { MedicalClientEventService } from "../services/medical-client-event.service";
import { MedicalClientEmailService } from "../services/medical-client-email.service";

@Injectable()
export class MedicalClientExternalListener {
    constructor(
        @Inject(MedicalClientManagementService) private readonly clientService: MedicalClientManagementService,
        @Inject(MedicalClientEmailService) private readonly emailService: MedicalClientEmailService,
        @Inject(MedicalClientJobPositionService) private readonly jobPositionService: MedicalClientJobPositionService,
        @Inject(MedicalClientEventService) private readonly eventService: MedicalClientEventService,
    ) { }

    @OnEvent(MedicalClientEvent.EXTERNAL_CREATE)
    async externalCreate({ source, data, jobPosition }: MedicalClientExternalCreateEvent): Promise<void> {
        await this.clientService.create(data);
        await this.emailService.assignEmail(data.dni, { email: data.email });
        await this.jobPositionService.assignJobPosition(data.dni, { jobPositionName: jobPosition.name });
        this.eventService.emitJobPositionExternalCreateEvent(source, jobPosition);
    }
}