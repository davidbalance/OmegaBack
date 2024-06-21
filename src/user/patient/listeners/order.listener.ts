import { OrderEvent, OrderFindOrCreatePatientEvent } from "@/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ExternalConnectionService } from "../service/external-connection.service";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class OrderListener {
    constructor(
        @Inject(ExternalConnectionService) private readonly externalService: ExternalConnectionService
    ) { }

    @OnEvent(OrderEvent.FIND_OR_CREATE_PATIENT)
    async findOrCreate({ findOrCreateEvent }: OrderFindOrCreatePatientEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}