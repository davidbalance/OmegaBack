import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { ExamEvent, ExamExternalCreateEvent } from "@/shared/events/exam.event";

@Injectable()
export class ExamExternalListener {
    constructor(
        @Inject(ExamExternalConnectionService) private readonly externalService: ExamExternalConnectionService
    ) { }

    @OnEvent(ExamEvent.EXTERNAL_CREATE)
    async findOrCreate({ key, source, data }: ExamExternalCreateEvent): Promise<void> {
        await this.externalService.findOneOrCreate({ key, source }, data);
    }
}