import { EventEmitter2 } from "@nestjs/event-emitter";
import { PatientEventService } from "../patient-event.service";
import { TestBed } from "@automock/jest";
import { PostMedicalClientRequestDto } from "@/medical/medical-client/dtos/request/post.medical-client.request.dto";
import { PatientGenderEnum } from "../../enums/patient.enum";
import { PostJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/post.job-position-with-key.request.dto";
import { MedicalClientEvent, MedicalClientExternalCreateEvent } from "@/shared/events/medical-client.event";

describe('PatientEventService', () => {
  let service: PatientEventService;
  let eventEmitter: jest.Mocked<EventEmitter2>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientEventService).compile();

    service = unit;
    eventEmitter = unitRef.get(EventEmitter2);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('emitMedicalClientExternalCreateEvent', () => {
    const source = 'external-source';
    const mockedMedicalClient: PostMedicalClientRequestDto = {
      email: "test@email.com",
      gender: PatientGenderEnum.MALE,
      birthday: new Date('2000-01-01'),
      name: "Name",
      lastname: "Lastname",
      dni: "1234567890"
    };
    const mockedJobPosition: PostJobPositionWithKeyRequestDto = {
      key: "test-key",
      name: "Job position"
    };

    it('should emit MedicalClientExternalCreateEvent', () => {
      // Arrange
      // Act
      service.emitMedicalClientExternalCreateEvent(source, mockedMedicalClient, mockedJobPosition);

      // Assert
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        MedicalClientEvent.EXTERNAL_CREATE,
        new MedicalClientExternalCreateEvent(source, mockedMedicalClient, mockedJobPosition)
      );
    });
  });

});
