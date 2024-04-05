import { CreatePatientExternalRequestDTO } from "@/user/common";

export const OrderEvent = {
    FIND_OR_CREATE_PATIENT: 'order.patient.findOrCreate'
}

export class OrderFindOrCreatePatientEvent {
    constructor(
        public readonly findOrCreateEvent: CreatePatientExternalRequestDTO & { source: string }
    ) { }
}