import { OrderEvent, OrderFindOrCreatePatientEvent } from "@/shared";
import { Inject, Injectable } from "@nestjs/common";
import { PatientExternalConnectionService } from "../external-connection/patient-external-connection.service";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class OrderListener {
    constructor(
        @Inject(PatientExternalConnectionService) private readonly externalService: PatientExternalConnectionService
    ) { }

    @OnEvent(OrderEvent.FIND_OR_CREATE_PATIENT)
    async findOrCreate({ findOrCreateEvent }: OrderFindOrCreatePatientEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}