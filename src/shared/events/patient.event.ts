import { PostPatientRequestDto } from "@/user/patient/dtos/request/post.patient.request.dto";

export const PatientEvent = {
    EXTERNAL_CREATE: 'patient.external.create',
}

export class PatientExternalCreateEvent {
    constructor(
        public readonly data: PostPatientRequestDto
    ) { }
}