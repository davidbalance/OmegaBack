import { TestBed } from "@automock/jest";
import { MedicalOrderFlatService } from "../medical-order-flat.service";
import { mockMedicalOrder } from "./stub/medical-order.stub";
import { MedicalOrderFlatResponseDto } from "../../dtos/response/base.medical-order-flat.response.dto";

describe('MedicalOrderFlatService', () => {
    let service: MedicalOrderFlatService;

    beforeEach(async () => {
        const { unit } = TestBed.create(MedicalOrderFlatService).compile();

        service = unit;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('flat', () => {
        const mockedMedicalOrder = mockMedicalOrder();
        const expectedResult: MedicalOrderFlatResponseDto = {
            id: mockedMedicalOrder.id,
            fullname: `${mockedMedicalOrder.client.name} ${mockedMedicalOrder.client.lastname}`,
            orderStatus: mockedMedicalOrder.orderStatus,
            companyRuc: mockedMedicalOrder.companyRuc,
            companyName: mockedMedicalOrder.companyName,
            process: mockedMedicalOrder.process,
            results: mockedMedicalOrder.results as any,
            dni: mockedMedicalOrder.client.dni,
            email: mockedMedicalOrder.client.email,
            mailStatus: mockedMedicalOrder.mailStatus,
            createAt: mockedMedicalOrder.createAt
        }

        it('should flatten a MedicalOrder object', () => {
            // Act
            const result = service.flat(mockedMedicalOrder);

            // Assert
            expect(result).toEqual(expectedResult);
        });
    });
});