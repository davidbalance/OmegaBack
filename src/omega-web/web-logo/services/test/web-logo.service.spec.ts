import { TestBed } from "@automock/jest";
import { WebLogoRepository } from "../../repositories/web-logo.repository";
import { WebLogoService } from "../web-logo.service";
import { mockWebLogo } from "./stub/web-logo.stub";

describe('WebLogoService', () => {
    let service: WebLogoService;
    let repository: jest.Mocked<WebLogoRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(WebLogoService).compile();

        service = unit;
        repository = unitRef.get(WebLogoRepository);
    });

    describe('findOne', () => {
        const id = 1;
        const mockedLogo = mockWebLogo();
        it('should return a single web logo by id', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedLogo);

            // Act
            const logo = await service.findOne(id);

            // Assert
            expect(logo).toEqual(mockedLogo);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
        });
    });
});