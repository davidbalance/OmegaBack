import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalResultEventService } from "./medical-result-event.service";
import { TestBed } from "@automock/jest";
import { DoctorRequestDto } from "@/user/doctor/dtos/request/doctor.base.dto";
import { ExternalExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/external-exam-with-key.base.dto";
import { DoctorEvent, DoctorExternalCreateEvent } from "@/shared/events/doctor.event";
import { ExamEvent, ExamExternalCreateEvent } from "@/shared/events/exam.event";
import { MedicalResultEvent, OnMedicalResultUploadFileEvent } from "@/shared/events/medical-result.event";

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
        it('should emit DoctorExternalCreateEvent and ExamExternalCreateEvent', () => {
            // Arrange
            const source = 'test-source';
            const doctor: DoctorRequestDto = {
                dni: '1234567890',
                name: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com'
            };
            const exam: ExternalExamWithKeyRequestDto = {
                key: 'test-key',
                name: 'Blood Test',
                type: {
                    key: 'test-type-key',
                    name: 'Laboratory',
                },
            };

            // Act
            service.emitMedicalResultCreateEvent(source, doctor, exam);

            // Assert
            const { key: keyExam, ...expectedExam } = exam;
            expect(eventEmitter.emit).toHaveBeenCalledWith(DoctorEvent.EXTERNAL_CREATE, new DoctorExternalCreateEvent(doctor));
            expect(eventEmitter.emit).toHaveBeenCalledWith(ExamEvent.EXTERNAL_CREATE, new ExamExternalCreateEvent(keyExam, source, expectedExam));
        });
    });

    describe('emitOnMedicalResultUploadFileEvent', () => {
        it('should emit OnMedicalResultUploadFileEvent', () => {
            // Arrange
            const id: number = 1;

            // Act
            service.emitOnMedicalResultUploadFileEvent(id);

            // Assert
            expect(eventEmitter.emit).toHaveBeenCalledWith(MedicalResultEvent.ON_UPLOAD_FILE, new OnMedicalResultUploadFileEvent(id));
        });
    });
});