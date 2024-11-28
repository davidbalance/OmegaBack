import { TestBed } from "@automock/jest";
import { PatientManagementService } from "../service/patient-management.service";
import { PatientListener } from "./patient.listener";

describe('PatientListener', () => {
    let service: PatientListener;
    let managementService: jest.Mocked<PatientManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(PatientListener).compile();

        service = unit;
        managementService = unitRef.get(PatientManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
