import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ResultEvent, ResultFindOrCreateExamEvent } from "@/shared";
import { ExternalConnectionService } from "../services/external-connection.service";

@Injectable()
export class MedicalResultListener {
    constructor(
        @Inject(ExternalConnectionService) private readonly externalService: ExternalConnectionService
    ) { }

    @OnEvent(ResultEvent.FIND_OR_CREATE_EXAM)
    async findOrCreate({ findOrCreateEvent }: ResultFindOrCreateExamEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}