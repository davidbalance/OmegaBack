import { TestBed } from "@automock/jest";
import { WebClientLogoService } from "../services/web-client-logo.service";
import { WebClientLogoController } from "./web-client-logo.controller";
import { PatchWebClientLogoRequestDto } from "../dtos/request/web-client-logo.patch.dto";

describe('WebClientLogoController', () => {
  let controller: WebClientLogoController;
  let service: jest.Mocked<WebClientLogoService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WebClientLogoController).compile();

    controller = unit;
    service = unitRef.get(WebClientLogoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('userLogo', () => {
    it('should find user logo', async () => {
      // Arrange
      const userId = 1;
      const mockedLogo = 'test-logo.png';
      service.findLogo.mockResolvedValue(mockedLogo);

      // Act
      const result = await controller.userLogo(userId);

      // Assert
      expect(service.findLogo).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ logo: mockedLogo });
    });
  })

  describe('findLogo', () => {
    it('should find logo by user id', async () => {
      // Arrange
      const userId = 1;
      const mockedLogo = 'test-logo.png';
      service.findLogo.mockResolvedValue(mockedLogo);

      // Act
      const result = await controller.findLogo(userId);

      // Assert
      expect(service.findLogo).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ logo: mockedLogo });
    });
  });

  describe('updateLogo', () => {
    it('should update logo', async () => {
      // Arrange
      const userId = 1;
      const mockDto: PatchWebClientLogoRequestDto = { logo: 1 };
      service.updateLogo.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateLogo(userId, mockDto);

      // Assert
      expect(service.updateLogo).toHaveBeenCalledWith(userId, mockDto);
      expect(result).toEqual({});
    });
  });
});