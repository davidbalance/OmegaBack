import { TestBed } from "@automock/jest";
import { DiseasePaginationService } from "../services/disease-pagination.service";
import { DiseasePaginationController } from "./disease-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockDiseases } from "../stub/disease.stub";

describe('DiseasePaginationController', () => {
    let controller: DiseasePaginationController;
    let service: jest.Mocked<DiseasePaginationService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DiseasePaginationController).compile();
        controller = unit;
        service = unitRef.get(DiseasePaginationService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('find', () => {
        const group: number = 1;
        const query: FilterMetaDto = { page: 0, take: 100 }
        const mockedDisease = mockDiseases();
        const expectedData = { data: mockedDisease };

        it('should call the service to create a new disease', async () => {
            // Arrange
            service.find.mockResolvedValue(mockedDisease);

            // Act
            const result = await controller.find(group, query);

            // Assert
            expect(service.find).toHaveBeenCalledWith(query, group);
            expect(result).toEqual(expectedData);
        });
    });

    describe('count', () => {
        const group: number = 1;
        const query: FilterMetaDto = { page: 0, take: 100 }
        const mockedCount: number = 1;
        const expectedData = { pages: mockedCount };

        it('should call the service to update a disease', async () => {
            // Arrange
            service.count.mockResolvedValue(mockedCount);

            // Act
            const result = await controller.count(group, query);

            // Assert
            expect(service.count).toHaveBeenCalledWith(query, group);
            expect(result).toEqual(expectedData);
        });
    });
});