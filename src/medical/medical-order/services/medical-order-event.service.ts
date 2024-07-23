import { Injectable, Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PostBranchWithKeyRequestDto } from "@/location/branch/dtos/request/post.branch-with-key.request.dto";
import { PostPatientRequestDto } from "@/user/patient/dtos/request/post.patient.request.dto";
import { PatientEvent, PatientExternalCreateEvent } from "@/shared/events/patient.event";
import { BranchEvent, BranchExternalCreateEvent } from "@/shared/events/branch.event";

@Injectable()
export class MedicalOrderEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalOrderCreateEvent(
        source: string,
        patient: PostPatientRequestDto,
        { key: branchKey, ...branch }: PostBranchWithKeyRequestDto): void {
        this.eventEmitter.emit(PatientEvent.EXTERNAL_CREATE, new PatientExternalCreateEvent(patient));
        this.eventEmitter.emit(BranchEvent.EXTERNAL_BRANCH, new BranchExternalCreateEvent(branchKey, source, branch));
    }
}