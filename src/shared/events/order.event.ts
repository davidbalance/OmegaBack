import { PostBranchExternalRequestDto } from "@/location/branch/dtos/request/post.branch-external.request.dto";
import { PostPatientRequestDto } from "@/user/patient/dtos/request/post.patient.request.dto";

export const OrderEvent = {
    FIND_OR_CREATE_PATIENT: 'order.patient.findOrCreate',
    FIND_OR_CREATE_BRANCH: 'order.branch.findOrCreate'
}

export class OrderFindOrCreatePatientEvent {
    constructor(
        public readonly data: PostPatientRequestDto
    ) { }
}

export class OrderFindOrCreateBranchEvent {
    constructor(
        public readonly key: string,
        public readonly source: string,
        public readonly data: PostBranchExternalRequestDto
    ) { }
}