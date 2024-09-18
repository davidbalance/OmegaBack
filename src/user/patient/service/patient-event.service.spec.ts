import { EventEmitter2 } from "@nestjs/event-emitter";
import { PatientEventService } from "./patient-event.service";
import { TestBed } from "@automock/jest";
import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";
import { MedicalClientRequestDto } from "@/medical/medical-client/dtos/request/medical-client.base.dto";
import { PatientGenderEnum } from "../enums/patient.enum";
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
        const source: string = 'test-source';
        const medicalClient: MedicalClientRequestDto = {
            email: "test@email.com",
            gender: PatientGenderEnum.MALE,
            birthday: new Date(),
            name: "Test name",
            lastname: "Test lastname",
            dni: "1234567890"
        };
        const jobPosition: ExternalJobPositionWithKeyRequestDto = {
            key: "test-key",
            name: "Test job"
        };

        it('should emit an ON_CREATE event with the correct payload', () => {
            // Act
            service.emitMedicalClientExternalCreateEvent(source, medicalClient, jobPosition);

            // Assert
            expect(eventEmitter.emit).toHaveBeenCalledWith(
                MedicalClientEvent.EXTERNAL_CREATE,
                new MedicalClientExternalCreateEvent(source, medicalClient, jobPosition),
            );
        });
    });
});