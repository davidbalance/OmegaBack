import { PostPatientRequestDto } from "@/user/patient/dtos/request/patient.post.dto";

export const PatientEvent = {
    LOCAL_CREATE: 'patient.local.create',
    EXTERNAL_CREATE: 'patient.external.create',
}

export class PatientExternalCreateEvent {
    constructor(
        public readonly data: PostPatientRequestDto
    ) { }
}

export class PatientLocalCreateEvent {
    constructor(
        public readonly data: PostPatientRequestDto
    ) { }
}