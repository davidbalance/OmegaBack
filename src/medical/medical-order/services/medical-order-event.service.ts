import { Injectable, Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PostBranchWithKeyRequestDto } from "@/location/branch/dtos/request/post.branch-with-key.request.dto";
import { BranchEvent, BranchExternalCreateEvent } from "@/shared/events/branch.event";

@Injectable()
export class MedicalOrderEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalOrderCreateEvent(
        source: string,
        { key: branchKey, ...branch }: PostBranchWithKeyRequestDto): void {
        this.eventEmitter.emit(BranchEvent.EXTERNAL_CREATE, new BranchExternalCreateEvent(source, branchKey, branch));
    }
}