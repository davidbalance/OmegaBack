import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderChecklistService } from "./medical-order-checklist.service";
import { mockMedicalOrderEntity } from "../stubs/medical-order-entity.stub";

describe('MedicalOrderChecklistService', () => {
    let service: MedicalOrderChecklistService;
    let repository: jest.Mocked<MedicalOrderRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderChecklistService).compile();

        service = unit;
        repository = unitRef.get(MedicalOrderRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findOne', () => {

        const id: number = 1;
        const mockedMedicalOrder = mockMedicalOrderEntity();
        const expectedValue = mockedMedicalOrder;

        it('should retrive one MedicalOrderEntity', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedMedicalOrder);

            // Act
            const result = await service.findOne(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: id },
                select: {
                    id: true,
                    companyRuc: true,
                    companyName: true,
                    createAt: true,
                    process: true,
                    client: {
                        name: true,
                        lastname: true,
                        dni: true,
                        jobPositionName: true
                    },
                },
                relations: {
                    results: true
                }
            });
            expect(result).toBe(expectedValue);

        });
    })
});