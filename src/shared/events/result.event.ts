import { CreateExamExternalRequestDTO } from "@/laboratory/exam/dtos/exam-external-connection.request.dto";
import { CreateDoctorExternalRequestDTO } from "@/user/common";

export const ResultEvent = {
    FIND_OR_CREATE_DOCTOR: 'result.doctor.findOrCreate',
    FIND_OR_CREATE_EXAM: 'result.exam.findOrCreate'
}

export class ResultFindOrCreateDoctorEvent {
    constructor(
        public readonly findOrCreateEvent: CreateDoctorExternalRequestDTO
    ) { }
}

export class ResultFindOrCreateExamEvent {
    constructor(
        public readonly findOrCreateEvent: CreateExamExternalRequestDTO & { source: string }
    ) { }
}