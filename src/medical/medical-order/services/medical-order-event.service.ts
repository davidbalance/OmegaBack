import { OrderEvent, OrderFindOrCreatePatientEvent, OrderFindOrCreateBranchEvent } from "@/shared/events";
import { Injectable, Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { POSTPatientRequestDto } from "@/user/patient/dtos/post.patient-management,dto";
import { POSTBranchWithExternalKeyRequestDto } from "@/location/branch/dtos/post.branch.dto";

@Injectable()
export class MedicalOrderEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalOrderCreateEvent(patient: POSTPatientRequestDto, branch: POSTBranchWithExternalKeyRequestDto): void {
        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_PATIENT, new OrderFindOrCreatePatientEvent(patient));
        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_BRANCH, new OrderFindOrCreateBranchEvent(branch));
    }
}