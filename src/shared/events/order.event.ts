import { POSTBranchRequestDTO } from "@/location/branch/dtos/external-connection.request.dto";
import { CreatePatientExternalRequestDTO } from "@/user/common";

export const OrderEvent = {
    FIND_OR_CREATE_PATIENT: 'order.patient.findOrCreate',
    FIND_OR_CREATE_BRANCH: 'order.branch.findOrCreate'
}

export class OrderFindOrCreatePatientEvent {
    constructor(
        public readonly findOrCreateEvent: CreatePatientExternalRequestDTO & { source: string }
    ) { }
}

export class OrderFindOrCreateBranchEvent {
    constructor(
        public readonly findOrCreateEvent: POSTBranchRequestDTO & { source: string }
    ) { }
}