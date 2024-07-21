import { POSTExamExternalConnectionRequestDto } from "@/laboratory/exam/dtos/post.exam.dto";
import { MedicalResultEvent, MedicalResultFindOrCreateDoctorEvent, MedicalResultFindOrCreateExamEvent } from "@/shared/events";
import { POSTDoctorRequestDto } from "@/user/doctor/dtos/post.doctor-management.dto";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class MedicalResultEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitMedicalResultCreateEvent(
        doctor: POSTDoctorRequestDto,
        exam: POSTExamExternalConnectionRequestDto
    ): void {
        this.eventEmitter.emit(MedicalResultEvent.FIND_OR_CREATE_DOCTOR, new MedicalResultFindOrCreateDoctorEvent(doctor));
        this.eventEmitter.emit(MedicalResultEvent.FIND_OR_CREATE_EXAM, new MedicalResultFindOrCreateExamEvent(exam));
    }
}