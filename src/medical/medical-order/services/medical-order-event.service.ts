import { OrderEvent, OrderFindOrCreatePatientEvent, OrderFindOrCreateBranchEvent } from "@/shared/events";
import { Injectable, Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { POSTPatientRequestDto } from "@/user/patient/dtos/post.patient-management,dto";
import { PostBranchExternalRequestDto } from "@/location/branch/dtos/request/post.branch-external.request.dto";
import { ExternalKeyParam } from "@/shared/utils/bases/base.external-connection";

@Injectable()
export class MedicalOrderEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalOrderCreateEvent({ key, source }: ExternalKeyParam, patient: POSTPatientRequestDto, branch: PostBranchExternalRequestDto): void {
        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_PATIENT, new OrderFindOrCreatePatientEvent(patient));
        this.eventEmitter.emit(OrderEvent.FIND_OR_CREATE_BRANCH, new OrderFindOrCreateBranchEvent(key, source, branch));
    }
}