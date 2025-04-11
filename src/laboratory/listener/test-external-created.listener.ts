import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TestExternalCreatedEventPayload } from "@omega/medical/application/notification-dispatcher/test-external.notification-dispatcher";
import { medicalEvent } from "@omega/medical/nest/inject/notification-dispatcher.inject";
import { CreateExamFromExternalSourceService } from "@omega/laboratory/application/service/create-exam-from-external-source.service";
import { InjectService } from "../nest/inject/service.inject";
import { TestExternalCreatedMapper } from "./mapper/test-external-created.mapper";

@Injectable()
export class TestExternalCreatedListener {
    constructor(
        @InjectService('CreateExamFromExternalSource') private readonly service: CreateExamFromExternalSourceService
    ) { }

    @OnEvent(medicalEvent.testCreated, { async: true })
    async handleTestCreatedEvent(payload: Required<TestExternalCreatedEventPayload>): Promise<void> {
        const mapped = TestExternalCreatedMapper.toService(payload);
        await this.service.createAsync(mapped);
    }
}