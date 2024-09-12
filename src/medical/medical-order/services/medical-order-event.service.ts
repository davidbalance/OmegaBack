import { Injectable, Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { BranchEvent, BranchExternalCreateEvent } from "@/shared/events/branch.event";
import { ExternalBranchWithKeyRequestDto } from "@/location/branch/dtos/request/external-branch-with-key.post.dto";

@Injectable()
export class MedicalOrderEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalOrderCreateEvent(
        source: string,
        { key: branchKey, ...branch }: ExternalBranchWithKeyRequestDto): void {
        this.eventEmitter.emit(BranchEvent.EXTERNAL_CREATE, new BranchExternalCreateEvent(source, branchKey, branch));
    }
}