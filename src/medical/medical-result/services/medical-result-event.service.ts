import { PostExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/post.exam-with-key.request.dto";
import { MedicalResultEvent, MedicalResultFindOrCreateDoctorEvent, MedicalResultFindOrCreateExamEvent } from "@/shared/events";
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
        this.eventEmitter.emit(MedicalResultEvent.FIND_OR_CREATE_DOCTOR, new MedicalResultFindOrCreateDoctorEvent(doctor));
        this.eventEmitter.emit(MedicalResultEvent.FIND_OR_CREATE_EXAM, new MedicalResultFindOrCreateExamEvent(examKey, source, exam));
    }
}