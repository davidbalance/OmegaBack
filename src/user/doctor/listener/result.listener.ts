import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ExternalConnectionService } from "../services/external-connection.service";
import { ResultEvent, ResultFindOrCreateDoctorEvent } from "@/shared";

@Injectable()
export class ResultListener {
    constructor(
        @Inject(ExternalConnectionService) private readonly externalService: ExternalConnectionService
    ) { }

    @OnEvent(ResultEvent.FIND_OR_CREATE_DOCTOR)
    async findOrCreate({ findOrCreateEvent }: ResultFindOrCreateDoctorEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}