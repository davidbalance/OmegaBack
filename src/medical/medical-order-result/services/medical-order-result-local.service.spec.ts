import { TestBed } from '@automock/jest';
import { MedicalOrderResultExternalService } from './medical-order-result-external.service';
import { MedicalResultManagementService } from '@/medical/medical-result/services/medical-result-management.service';
import { MedicalOrderManagementService } from '@/medical/medical-order/services/medical-order-management.service';

describe('MedicalOrderResultExternalService', () => {
    let service: MedicalOrderResultExternalService;
    let orderService: jest.Mocked<MedicalOrderManagementService>;
    let resultService: jest.Mocked<MedicalResultManagementService>

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderResultExternalService).compile();

        service = unit;
        orderService = unitRef.get(MedicalOrderManagementService);
        resultService = unitRef.get(MedicalResultManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
