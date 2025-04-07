import { Injectable } from "@nestjs/common";
import { InjectService } from "../nest/inject/service.inject";
import { CreateBranchFromExternalSourceService } from "../application/service/create-branch-from-external-source.service";
import { medicalEvent } from "@omega/medical/nest/inject/notification-dispatcher.inject";
import { OnEvent } from "@nestjs/event-emitter";
import { OrderExternalCreatedEventPayload } from "@omega/medical/application/notification-dispatcher/order-external.notification-dispatcher";
import { OrderExternalCreatedMapper } from "./mapper/order-external-created.mapper";

@Injectable()
export class OrderExternalCreatedListener {
    constructor(
        @InjectService('CreateBranchFromExternalSource') private readonly service: CreateBranchFromExternalSourceService
    ) { }

    @OnEvent(medicalEvent.orderCreated, { async: true })
    async handleTestCreatedEvent(payload: Required<OrderExternalCreatedEventPayload>): Promise<void> {
        console.log(`OrderExternalCreatedListener -> ${JSON.stringify(payload)}`);
        const mapped = OrderExternalCreatedMapper.toService(payload);
        await this.service.createAsync(mapped);
    }
}