import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalClientEventService } from "./medical-client-event.service";
import { TestBed } from "@automock/jest";
import { PatientRequestDto } from "@/user/patient/dtos/request/patient.base.dto";
import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { PatientEvent, PatientExternalCreateEvent, PatientLocalCreateEvent } from "@/shared/events/patient.event";
import { JobPositionEvent, JobPositionExternalCreateEvent, JobPositionLocalCreateEvent } from "@/shared/events/job-position.event";
import { JobPositionRequestDto } from "@/location/job-position/dtos/request/job-position.base.dto";

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

  describe('emitLocalCreateEvent', () => {
    it('should emit PatientLocalCreateEvent and JobPositionLocalCreateEvent', () => {
      // Arrange
      const patient: PatientRequestDto = {
        name: 'John',
        lastname: 'Doe',
        dni: '1234567890',
        gender: PatientGenderEnum.MALE,
        birthday: new Date()
      };
      const jobPosition: JobPositionRequestDto = {
        name: 'Doctor',
      };

      // Act
      service.emitLocalCreateEvent(patient, jobPosition);

      // Assert
      expect(eventEmitter.emit).toHaveBeenCalledWith(PatientEvent.LOCAL_CREATE, new PatientLocalCreateEvent(patient));
      expect(eventEmitter.emit).toHaveBeenCalledWith(JobPositionEvent.LOCAL_CREATE, new JobPositionLocalCreateEvent(jobPosition));
    });

    it('should emit only PatientLocalCreateEvent when jobPosition is undefined', () => {
      // Arrange
      const patient: PatientRequestDto = {
        name: 'John',
        lastname: 'Doe',
        dni: '1234567890',
        birthday: new Date(),
        gender: PatientGenderEnum.MALE,
      };

      // Act
      service.emitLocalCreateEvent(patient);

      // Assert
      expect(eventEmitter.emit).toHaveBeenCalledWith(PatientEvent.LOCAL_CREATE, new PatientLocalCreateEvent(patient));
      expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('emitExternalCreateEvent', () => {
    it('should emit PatientExternalCreateEvent and JobPositionExternalCreateEvent', () => {
      // Arrange
      const source = 'test-source';
      const patient: PatientRequestDto = {
        name: 'John',
        lastname: 'Doe',
        dni: '1234567890',
        gender: PatientGenderEnum.MALE,
        birthday: new Date()
      };
      const jobPosition: ExternalJobPositionWithKeyRequestDto = {
        key: 'test-key',
        name: 'Doctor',
      };

      // Act
      service.emitExternalCreateEvent(source, patient, jobPosition);

      // Assert
      expect(eventEmitter.emit).toHaveBeenCalledWith(PatientEvent.EXTERNAL_CREATE, new PatientExternalCreateEvent(patient));
      const { key: keyJobPosition, ...expectedJobPosition } = jobPosition;
      expect(eventEmitter.emit).toHaveBeenCalledWith(JobPositionEvent.EXTERNAL_CREATE, new JobPositionExternalCreateEvent(source, keyJobPosition, expectedJobPosition));
    });

    it('should emit only PatientExternalCreateEvent when jobPosition is undefined', () => {
      // Arrange
      const source = 'test-source';
      const patient: PatientRequestDto = {
        name: 'John',
        lastname: 'Doe',
        dni: '1234567890',
        birthday: new Date(),
        gender: PatientGenderEnum.MALE,
      };

      // Act
      service.emitExternalCreateEvent(source, patient);

      // Assert
      expect(eventEmitter.emit).toHaveBeenCalledWith(PatientEvent.EXTERNAL_CREATE, new PatientExternalCreateEvent(patient));
      expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('emitJobPositionExternalCreateEvent', () => {
    it('should emit JobPositionExternalCreateEvent', () => {
      // Arrange
      const source = 'test-source';
      const jobPosition: ExternalJobPositionWithKeyRequestDto = {
        key: 'test-key',
        name: 'Doctor',
      };

      // Act
      service.emitJobPositionExternalCreateEvent(source, jobPosition);

      // Assert
      const { key, ...expectedJobPositon } = jobPosition;
      expect(eventEmitter.emit).toHaveBeenCalledWith(JobPositionEvent.EXTERNAL_CREATE, new JobPositionExternalCreateEvent(source, key, expectedJobPositon));
    });
  });

  describe('emitJobPositionLocalCreateEvent', () => {
    it('should emit JobPositionLocalCreateEvent', () => {
      // Arrange
      const jobPosition: JobPositionRequestDto = {
        name: 'Doctor',
      };

      // Act
      service.emitJobPositionLocalCreateEvent(jobPosition);

      // Assert
      expect(eventEmitter.emit).toHaveBeenCalledWith(JobPositionEvent.LOCAL_CREATE, new JobPositionLocalCreateEvent(jobPosition));
    });
  });
});