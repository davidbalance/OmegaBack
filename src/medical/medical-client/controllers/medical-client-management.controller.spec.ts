import { TestBed } from "@automock/jest";
import { MedicalClientLocalService } from "../services/medical-client-local.service";
import { MedicalClientManagementController } from "./medical-client-management.controller";

describe('MedicalClientManagementController', () => {
    let controller: MedicalClientManagementController;
    let service: jest.Mocked<MedicalClientLocalService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalClientManagementController).compile();

        controller = unit;
        service = unitRef.get(MedicalClientLocalService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});