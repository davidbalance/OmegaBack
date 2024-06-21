import { POSTExamRequestDto } from "@/laboratory/exam/dtos/exam.request.dto";
import { POSTDoctorRequestDto } from "@/user/doctor/dtos/doctor.request.dto";

export const ResultEvent = {
    FIND_OR_CREATE_DOCTOR: 'result.doctor.findOrCreate',
    FIND_OR_CREATE_EXAM: 'result.exam.findOrCreate'
}

export class ResultFindOrCreateDoctorEvent {
    constructor(
        public readonly findOrCreateEvent: POSTDoctorRequestDto
    ) { }
}

export class ResultFindOrCreateExamEvent {
    constructor(
        public readonly findOrCreateEvent: POSTExamRequestDto & { source: string }
    ) { }
}