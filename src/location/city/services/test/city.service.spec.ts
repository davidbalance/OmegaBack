import { TestBed } from "@automock/jest";
import { CityRepository } from "../../repositories/city.repository";
import { CityService } from "../city.service";
import { mockCities, mockCity } from "./stub/city.stub";

describe('CityService', () => {
    let service: CityService;
    let repository: jest.Mocked<CityRepository>

    beforeEach(() => {
        const { unit, unitRef } = TestBed.create(CityService).compile();

        service = unit;
        repository = unitRef.get(CityRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('find', () => {
        const mockedCities = mockCities();

        it('should return a single city by id', async () => {
            // Arrange
            repository.find.mockResolvedValueOnce(mockedCities);

            // Act
            const city = await service.find();

            // Assert
            expect(city).toEqual(mockedCities);
            expect(repository.find).toHaveBeenCalledWith({ select: { id: true, name: true } });
        });
    });

    describe('findOne', () => {
        const id: number = 1;
        const mockedCity = mockCity();

        it('should return a single city by id', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedCity);

            // Act
            const city = await service.findOne(id);

            // Assert
            expect(city).toEqual(mockedCity);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
        });
    });

    describe('findOneByName', () => {
        const name: string = 'sample-city';
        const mockedCity = mockCity();

        it('should return a single city by id', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedCity);

            // Act
            const city = await service.findOneByName(name);

            // Assert
            expect(city).toEqual(mockedCity);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { name: name } });
        });
    });

});