import { PostExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/post.exam-with-key.request.dto";
import { DoctorEvent, DoctorExternalCreateEvent } from "@/shared/events/doctor.event";
import { ExamEvent, ExamExternalCreateEvent } from "@/shared/events/exam.event";
import { PostDoctorRequestDto } from "@/user/doctor/dtos/request/post.doctor.dto";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class MedicalResultEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalResultCreateEvent(
        source: string,
        doctor: PostDoctorRequestDto,
        { key: examKey, ...exam }: PostExamWithKeyRequestDto
    ): void {
        this.eventEmitter.emit(DoctorEvent.EXTERNAL_CREATE, new DoctorExternalCreateEvent(doctor));
        this.eventEmitter.emit(ExamEvent.EXTERNAL_CREATE, new ExamExternalCreateEvent(examKey, source, exam));
    }
}