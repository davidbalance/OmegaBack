import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { JobPositionEvent, JobPositionLocalCreateEvent } from "@/shared/events/job-position.event";
import { JobPositionManagementService } from "../services/job-position-management.service";

@Injectable()
export class JobPositionListener {

    constructor(
        @Inject(JobPositionManagementService) private readonly service: JobPositionManagementService
    ) { }

    @OnEvent(JobPositionEvent.LOCAL_CREATE)
    async onCreateEvent({ data }: JobPositionLocalCreateEvent): Promise<void> {
        try {
            await this.service.findOneByName(data.name)
        } catch (error) {
            await this.service.create(data);
        }
    }
}