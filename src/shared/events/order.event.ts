import { POSTBranchWithExternalKeyRequestDto } from "@/location/branch/dtos/post.branch.dto";
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
        public readonly findOrCreateEvent: POSTBranchWithExternalKeyRequestDto
    ) { }
}