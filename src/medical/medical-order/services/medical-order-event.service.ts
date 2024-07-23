import { OrderEvent, OrderFindOrCreatePatientEvent, OrderFindOrCreateBranchEvent } from "@/shared/events";
import { Injectable, Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PostBranchWithKeyRequestDto } from "@/location/branch/dtos/request/post.branch-with-key.request.dto";
import { PostPatientRequestDto } from "@/user/patient/dtos/request/post.patient.request.dto";

@Injectable()
export class MedicalOrderEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalOrderCreateEvent(
        source: string,
        patient: PostPatientRequestDto,
        { key: branchKey, ...branch }: PostBranchWithKeyRequestDto): void {
        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_PATIENT, new OrderFindOrCreatePatientEvent(patient));
        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_BRANCH, new OrderFindOrCreateBranchEvent(branchKey, source, branch));
    }
}