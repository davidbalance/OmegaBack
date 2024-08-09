import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalClientEventService } from "../medical-client-event.service";
import { TestBed } from "@automock/jest";
import { PostPatientRequestDto } from "@/user/patient/dtos/request/post.patient.request.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { JobPositionEvent, JobPositionExternalCreateEvent } from "@/shared/events/job-position.event";
import { PatientEvent, PatientExternalCreateEvent } from "@/shared/events/patient.event";
import { JobPositionRequestDto } from "@/location/job-position/dtos/request/base.job-position.request.dto";

describe('MedicalClientEventService', () => {
  let service: MedicalClientEventService;
  let eventEmitter: jest.Mocked<EventEmitter2>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientEventService).compile();

    service = unit;
    eventEmitter = unitRef.get(EventEmitter2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('emitExternalCreateEvent', () => {
    const source = 'external-source';
    const jobPositionKey: string = 'test-key';
    const patient: PostPatientRequestDto = {
      dni: '1234567890',
      name: 'Test Patient',
      lastname: 'Test Lastname',
      birthday: new Date(),
      gender: PatientGenderEnum.MALE,
      role: 'test-role'
    };
    const jobPosition: JobPositionRequestDto = {
      name: 'Test Job Position'
    };

    it('should emit EXTERNAL_CREATE events for patient and job position', () => {
      // Act
      service.emitExternalCreateEvent(source, patient, { ...jobPosition, key: jobPositionKey });

      // Assert
      expect(eventEmitter.emit).toHaveBeenCalledWith(PatientEvent.EXTERNAL_CREATE, new PatientExternalCreateEvent(patient));
      expect(eventEmitter.emit).toHaveBeenCalledWith(JobPositionEvent.EXTERNAL_CREATE, new JobPositionExternalCreateEvent(source, jobPositionKey, jobPosition));
    });
  });

  describe('emitJobPositionExternalCreateEvent', () => {
    const source = 'external-source';
    const jobPositionKey: string = 'test-key';
    const jobPosition: JobPositionRequestDto = {
      name: 'Test Job Position'
    };

    it('should emit EXTERNAL_CREATE event for job position', () => {
      // Act
      service.emitJobPositionExternalCreateEvent(source, { ...jobPosition, key: jobPositionKey });

      // Assert
      expect(eventEmitter.emit).toHaveBeenCalledWith(JobPositionEvent.EXTERNAL_CREATE, new JobPositionExternalCreateEvent(source, jobPositionKey, jobPosition));
    });
  });
});