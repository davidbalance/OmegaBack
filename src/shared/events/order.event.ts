import { POSTBranchRequestDto } from "@/location/branch/dtos/branch.request.dto";
import { POSTPatientRequestDto } from "@/user/patient/dtos/post.patient-management,dto";

export const OrderEvent = {
    FIND_OR_CREATE_PATIENT: 'order.patient.findOrCreate',
    FIND_OR_CREATE_BRANCH: 'order.branch.findOrCreate'
}

export class OrderFindOrCreatePatientEvent {
    constructor(
        public readonly findOrCreateEvent: POSTPatientRequestDto & { source: string }
    ) { }
}

export class OrderFindOrCreateBranchEvent {
    constructor(
        public readonly findOrCreateEvent: POSTBranchRequestDto & { source: string }
    ) { }
}