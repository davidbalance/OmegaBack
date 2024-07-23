import { Inject, Injectable } from "@nestjs/common";
import { JobPositionExternalConnectionService } from "../services/job-position-external-connection.service";
import { OnEvent } from "@nestjs/event-emitter";
import { JobPositionEvent, JobPositionExternalCreateEvent } from "@/shared/events/job-position.event";

@Injectable()
export class JobPositionExternalListener {

    constructor(
        @Inject() private readonly service: JobPositionExternalConnectionService
    ) { }

    @OnEvent(JobPositionEvent.EXTERNAL_CREATE)
    async onExternalCreate({ key, source, data }: JobPositionExternalCreateEvent): Promise<void> {
        await this.service.findOneOrCreate({ key, source }, data);
    }
}