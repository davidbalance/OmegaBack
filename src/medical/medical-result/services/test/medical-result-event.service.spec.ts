import { TestBed } from "@automock/jest";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalResultEventService } from "../medical-result-event.service";
import { PostDoctorRequestDto } from "@/user/doctor/dtos/request/post.doctor.dto";
import { PostExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/post.exam-with-key.request.dto";
import { DoctorEvent, DoctorExternalCreateEvent } from "@/shared/events/doctor.event";
import { ExamEvent, ExamExternalCreateEvent } from "@/shared/events/exam.event";

describe('MedicalResultEventService', () => {
    let service: MedicalResultEventService;
    let eventEmitter: jest.Mocked<EventEmitter2>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultEventService).compile();

        service = unit;
        eventEmitter = unitRef.get(EventEmitter2);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('emitMedicalResultCreateEvent', () => {
        const source = 'external-source';
        const mockedDoctor: PostDoctorRequestDto = {
            name: "Name",
            lastname: "Lastname",
            email: "test@email.com",
            dni: "1234567890"
        };
        const mockedExam: PostExamWithKeyRequestDto = {
            key: "mocked-key",
            type: undefined,
            name: "Name"
        };

        it('should emit DoctorExternalCreateEvent and ExamExternalCreateEvent', () => {
            // Arrange
            const { key: examKey, ...exam } = mockedExam;

            // Act
            service.emitMedicalResultCreateEvent(source, mockedDoctor, mockedExam);

            // Assert
            expect(eventEmitter.emit).toHaveBeenCalledWith(DoctorEvent.EXTERNAL_CREATE, new DoctorExternalCreateEvent(mockedDoctor));
            expect(eventEmitter.emit).toHaveBeenCalledWith(ExamEvent.EXTERNAL_CREATE, new ExamExternalCreateEvent(examKey, source, exam));
        });
    });
});