import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ExamExternalConnectionService } from "../external-connections/exam-external-connection.service";
import { ResultEvent, ResultFindOrCreateExamEvent } from "@/shared";

@Injectable()
export class ResultListener {
    constructor(
        @Inject(ExamExternalConnectionService) private readonly externalService: ExamExternalConnectionService
    ) { }

    @OnEvent(ResultEvent.FIND_OR_CREATE_EXAM)
    async findOrCreate({ findOrCreateEvent }: ResultFindOrCreateExamEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}