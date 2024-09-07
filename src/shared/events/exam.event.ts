import { PostExamExternalRequestDto } from "@/laboratory/exam/dtos/request/external-exam.post.dto";

export const ExamEvent = {
    EXTERNAL_CREATE: 'exam.external.create'
}

export class ExamExternalCreateEvent {
    constructor(
        public readonly source: string,
        public readonly key: string,
        public readonly data: PostExamExternalRequestDto
    ) { }
}