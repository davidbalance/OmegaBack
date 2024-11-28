import { TestBed } from "@automock/jest";
import { MedicalClientEmailService } from "./medical-client-email.service";
import { MedicalClientEventService } from "./medical-client-event.service";
import { MedicalClientJobPositionService } from "./medical-client-job-position.service";
import { MedicalClientLocalService } from "./medical-client-local.service";
import { MedicalClientManagementService } from "./medical-client-management.service";

describe('MedicalClientLocalService', () => {
    let service: MedicalClientLocalService;
    let managementService: jest.Mocked<MedicalClientManagementService>;
    let emailService: jest.Mocked<MedicalClientEmailService>;
    let eventService: jest.Mocked<MedicalClientEventService>;
    let jobPositionService: jest.Mocked<MedicalClientJobPositionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalClientLocalService).compile();

        service = unit;
        managementService = unitRef.get(MedicalClientManagementService);
        emailService = unitRef.get(MedicalClientEmailService);
        eventService = unitRef.get(MedicalClientEventService);
        jobPositionService = unitRef.get(MedicalClientJobPositionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});