import { TestBed } from "@automock/jest";
import { WebLogoRepository } from "../repositories/web-logo.repository";
import { WebLogoService } from "./web-logo.service";
import { mockWebLogoEntity } from "../stub/web-logo.stub";

describe('WebLogoService', () => {
    let service: WebLogoService;
    let repository: jest.Mocked<WebLogoRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(WebLogoService).compile();

        service = unit;
        repository = unitRef.get(WebLogoRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should find one', async () => {
        // Arrange
        const id = 1;
        const mockedData = mockWebLogoEntity();
        repository.findOne.mockResolvedValue(mockedData);

        // Act
        const result = await service.findOne(id);

        // Assert
        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
        expect(result).toEqual(mockedData);
    });
});