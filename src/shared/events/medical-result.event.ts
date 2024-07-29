import { POSTExamRequestDto } from "@/laboratory/exam/dtos/post.exam.dto";
import { POSTDoctorRequestDto } from "@/user/doctor/dtos/post.doctor-management.dto";

export const MedicalResultEvent = {
    FIND_OR_CREATE_DOCTOR: 'result.doctor.findOrCreate',
    FIND_OR_CREATE_EXAM: 'result.exam.findOrCreate'
}

export class MedicalResultFindOrCreateDoctorEvent {
    constructor(
        public readonly findOrCreateEvent: POSTDoctorRequestDto
    ) { }
}

export class MedicalResultFindOrCreateExamEvent {
    constructor(
        public readonly findOrCreateEvent: POSTExamRequestDto & { source: string }
    ) { }
}