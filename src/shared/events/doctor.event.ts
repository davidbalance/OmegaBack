import { DoctorRequestDto } from "@/user/doctor/dtos/request/base.doctor.request.dto";

export const DoctorEvent = {
    EXTERNAL_CREATE: 'doctor.external.create'
}

export class DoctorExternalCreateEvent {
    constructor(
        public readonly data: DoctorRequestDto
    ) { }
}