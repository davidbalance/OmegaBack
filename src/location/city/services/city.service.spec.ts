import { TestBed } from "@automock/jest";
import { CityRepository } from "../repositories/city.repository";
import { CityService } from "./city.service";
import { mockCities, mockCity } from "../stub/city.stub";

describe('CityService', () => {
    let service: CityService;
    let repository: jest.Mocked<CityRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CityService).compile();

        service = unit;
        repository = unitRef.get(CityRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('find', () => {
        it('should return an array of cities', async () => {
            // Arrange
            const mockedData = mockCities();
            repository.find.mockResolvedValue(mockedData);

            // Act
            const result = await service.find();

            // Assert
            expect(repository.find).toHaveBeenCalledWith({ select: { id: true, name: true } });
            expect(result).toEqual(mockedData);
        });
    });

    describe('findOne', () => {
        it('should return a city by id', async () => {
            // Arrange
            const id = 1;
            const mockedData = mockCity();
            repository.findOne.mockResolvedValue(mockedData);

            // Act
            const result = await service.findOne(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
            expect(result).toEqual(mockedData);
        });
    });

    describe('findOneByName', () => {
        it('should return a city by name', async () => {
            // Arrange
            const name = 'City Name';
            const mockedData = mockCity();
            repository.findOne.mockResolvedValue(mockedData);

            // Act
            const result = await service.findOneByName(name);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { name: name } });
            expect(result).toEqual(mockedData);
        });
    });
});
