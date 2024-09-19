import { ExternalExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/external-exam-with-key.base.dto";
import { DoctorEvent, DoctorExternalCreateEvent } from "@/shared/events/doctor.event";
import { ExamEvent, ExamExternalCreateEvent } from "@/shared/events/exam.event";
import { MedicalResultEvent, OnMedicalResultUploadFileEvent } from "@/shared/events/medical-result.event";
import { DoctorRequestDto } from "@/user/doctor/dtos/request/doctor.base.dto";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class MedicalResultEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalResultCreateEvent(
        source: string,
        doctor: DoctorRequestDto,
        { key: examKey, ...exam }: ExternalExamWithKeyRequestDto
    ): void {
        this.eventEmitter.emit(DoctorEvent.EXTERNAL_CREATE, new DoctorExternalCreateEvent(doctor));
        this.eventEmitter.emit(ExamEvent.EXTERNAL_CREATE, new ExamExternalCreateEvent(examKey, source, exam));
    }

    emitOnMedicalResultUploadFileEvent(
        id: number
    ): void {
        this.eventEmitter.emit(MedicalResultEvent.ON_UPLOAD_FILE, new OnMedicalResultUploadFileEvent(id))
    }
}