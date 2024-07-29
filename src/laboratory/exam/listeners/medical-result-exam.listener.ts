import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { MedicalResultEvent, MedicalResultFindOrCreateExamEvent } from "@/shared/events";

@Injectable()
export class MedicalResultExamListener {
    constructor(
        @Inject(ExamExternalConnectionService) private readonly externalService: ExamExternalConnectionService
    ) { }

    @OnEvent(MedicalResultEvent.FIND_OR_CREATE_EXAM)
    async findOrCreate({ findOrCreateEvent }: MedicalResultFindOrCreateExamEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}