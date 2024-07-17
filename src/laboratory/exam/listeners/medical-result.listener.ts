import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ExternalConnectionService } from "../services/external-connection.service";
import { MedicalResultEvent, MedicalResultFindOrCreateExamEvent } from "@/shared";

@Injectable()
export class MedicalResultListener {
    constructor(
        @Inject(ExternalConnectionService) private readonly externalService: ExternalConnectionService
    ) { }

    @OnEvent(MedicalResultEvent.FIND_OR_CREATE_EXAM)
    async findOrCreate({ findOrCreateEvent }: MedicalResultFindOrCreateExamEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}