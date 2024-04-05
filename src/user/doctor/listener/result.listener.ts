import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DoctorExternalConnectionService } from "../external-connection/doctor-external-connection.service";
import { ResultEvent, ResultFindOrCreateDoctorEvent } from "@/shared";

@Injectable()
export class ResultListener {
    constructor(
        @Inject(DoctorExternalConnectionService) private readonly externalService: DoctorExternalConnectionService
    ) { }

    @OnEvent(ResultEvent.FIND_OR_CREATE_DOCTOR)
    async findOrCreate({ findOrCreateEvent }: ResultFindOrCreateDoctorEvent): Promise<void> {
        await this.externalService.findOneOrCreate(findOrCreateEvent);
    }
}