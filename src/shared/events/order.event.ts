import { PostBranchExternalRequestDto } from "@/location/branch/dtos/request/post.branch-external.request.dto";
import { POSTPatientRequestDto } from "@/user/patient/dtos/post.patient-management,dto";

export const OrderEvent = {
    FIND_OR_CREATE_PATIENT: 'order.patient.findOrCreate',
    FIND_OR_CREATE_BRANCH: 'order.branch.findOrCreate'
}

export class OrderFindOrCreatePatientEvent {
    constructor(
        public readonly findOrCreateEvent: POSTPatientRequestDto
    ) { }
}

export class OrderFindOrCreateBranchEvent {
    constructor(
        public readonly key: string,
        public readonly source: string,
        public readonly data: PostBranchExternalRequestDto
    ) { }
}