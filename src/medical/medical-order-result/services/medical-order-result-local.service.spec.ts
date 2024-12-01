import { MedicalOrderManagementService } from "@/medical/medical-order/services/medical-order-management.service";
import { MedicalOrderResultLocalService } from "./medical-order-result-local.service";
import { MedicalResultManagementService } from "@/medical/medical-result/services/medical-result-management.service";
import { TestBed } from "@automock/jest";
import { mockMedicalOrder } from "@/medical/medical-order/stubs/medical-order.stub";
import { mockMedicalResult, mockMedicalResults } from "@/medical/medical-result/stub/medical-result.stub";
import { LocalMedicalResultOrderRequestDto } from "../dtos/request/local-medical-result-order.base.dto";

describe('MedicalOrderResultLocalService', () => {
    let service: MedicalOrderResultLocalService;
    let orderService: jest.Mocked<MedicalOrderManagementService>;
    let resultService: jest.Mocked<MedicalResultManagementService>

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderResultLocalService).compile();

        service = unit;
        orderService = unitRef.get(MedicalOrderManagementService);
        resultService = unitRef.get(MedicalResultManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockedOrder = mockMedicalOrder();
        const mockedResult = mockMedicalResult();

        const data: LocalMedicalResultOrderRequestDto = {
            results: [{
                doctorDni: 'sample',
                doctorFullname: 'sample',
                examType: "Sample",
                examSubtype: "Sample",
                examName: "Sample"
            }],
            corporativeName: "Sample",
            companyName: "Sample",
            companyRuc: "1234567890001",
            branchName: "Sample",
            patientDni: "1234567890",
            process: "Post Ocupacional"
        }

        const expectValue = { ...mockedOrder, results: [mockedResult] };

        it('should create a new medical order', async () => {
            // Arrange
            orderService.create.mockResolvedValue(mockedOrder);
            resultService.create.mockResolvedValue(mockedResult);

            // Act
            const result = await service.create(data);

            // Assert
            const { results, ...order } = data;
            expect(orderService.create).toHaveBeenCalledWith(order);
            expect(resultService.create).toHaveBeenCalledWith({ ...results[0], order: mockedOrder.id });
            expect(JSON.stringify(result)).toBe(JSON.stringify(expectValue));
        });
    });
});
