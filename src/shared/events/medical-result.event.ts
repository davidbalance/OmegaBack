import { PostExamExternalRequestDto } from "@/laboratory/exam/dtos/request/post.exam-external.request.dto";
import { PostDoctorRequestDto } from "@/user/doctor/dtos/request/post.doctor.dto";

export const MedicalResultEvent = {
    FIND_OR_CREATE_DOCTOR: 'result.doctor.findOrCreate',
    FIND_OR_CREATE_EXAM: 'result.exam.findOrCreate'
}

export class MedicalResultFindOrCreateDoctorEvent {
    constructor(
        public readonly findOrCreateEvent: PostDoctorRequestDto
    ) { }
}

export class MedicalResultFindOrCreateExamEvent {
    constructor(
        public readonly key: string,
        public readonly source: string,
        public readonly data: PostExamExternalRequestDto
    ) { }
}