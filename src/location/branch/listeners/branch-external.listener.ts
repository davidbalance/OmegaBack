import { Inject, Injectable } from "@nestjs/common";
import { BranchExternalConnectionService } from "../services/branch-external-connection.service";
import { OnEvent } from "@nestjs/event-emitter";
import { BranchEvent, BranchExternalCreateEvent } from "@/shared/events/branch.event";

@Injectable()
export class BranchExternalListener {
    constructor(
        @Inject(BranchExternalConnectionService) private readonly service: BranchExternalConnectionService
    ) { }

    @OnEvent(BranchEvent.EXTERNAL_CREATE)
    async onExternalCreate({ key, source, data }: BranchExternalCreateEvent): Promise<void> {
        await this.service.create({ key, source }, data);
    }
}