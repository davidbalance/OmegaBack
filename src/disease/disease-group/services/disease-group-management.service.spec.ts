import { TestBed } from "@automock/jest";
import { DiseaseGroupRepository } from "../repository/disease-group.repository";
import { DiseaseGroupManagementService } from "./disease-group-management.service";
import { DiseaseGroupRequestDto } from "../dtos/request/disease-group.base.request.dto";
import { mockDiseaseGroupEntity } from "../stub/disease-group-entity.stub";

describe('DiseaseGroupManagementService', () => {
    let service: DiseaseGroupManagementService;
    let repository: jest.Mocked<DiseaseGroupRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DiseaseGroupManagementService).compile();

        service = unit;
        repository = unitRef.get(DiseaseGroupRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a disease group', async () => {
            // Arrange
            const mockDto: DiseaseGroupRequestDto = { name: 'test' };
            const mockedData = mockDiseaseGroupEntity();
            repository.create.mockResolvedValue(mockedData);

            // Act
            const result = await service.create(mockDto);

            // Assert
            expect(repository.create).toHaveBeenCalledWith(mockDto);
            expect(result).toEqual(mockedData);
        });
    });

    describe('findOne', () => {
        it('should find a disease group by ID', async () => {
            // Arrange
            const id = 1;
            const mockedData = mockDiseaseGroupEntity();
            repository.findOne.mockResolvedValue(mockedData);

            // Act
            const result = await service.findOne(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
            expect(result).toEqual(mockedData);
        });
    });

    describe('hasDiseases', () => {
        it('should return true if the disease group has active diseases', async () => {
            // Arrange
            const id = 1;
            const mockedData = mockDiseaseGroupEntity();
            mockedData.diseases = [{ ...mockedData.diseases[0], status: true }];
            repository.findOne.mockResolvedValue(mockedData);

            // Act
            const result = await service.hasDiseases(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { diseases: true } });
            expect(result).toBe(true);
        });

        it('should return false if the disease group has no active diseases', async () => {
            // Arrange
            const id = 1;
            const mockedData = mockDiseaseGroupEntity();
            mockedData.diseases = [{ ...mockedData.diseases[0], status: false }];
            repository.findOne.mockResolvedValue(mockedData);

            // Act
            const result = await service.hasDiseases(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { diseases: true } });
            expect(result).toBe(false);
        });
    });

    describe('updateOne', () => {
        it('should update a disease group', async () => {
            // Arrange
            const id = 1;
            const mockDto: DiseaseGroupRequestDto = { name: 'test updated' };
            const mockedData = mockDiseaseGroupEntity();
            repository.findOneAndUpdate.mockResolvedValue(mockedData);

            // Act
            const result = await service.updateOne(id, mockDto);

            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockDto);
            expect(result).toEqual(mockedData);
        });
    });

    describe('deleteOne', () => {
        it('should delete a disease group', async () => {
            // Arrange
            const id = 1;
            repository.findOneAndDelete.mockResolvedValue(undefined);

            // Act
            await service.deleteOne(id);

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
        });
    });
});
