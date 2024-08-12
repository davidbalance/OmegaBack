import { TestBed } from "@automock/jest";
import { WebClientLogoService } from "../services/web-client-logo.service";
import { WebClientLogoController } from "./web-client-logo.controller";
import { PatchWebClientLogoRequestDto } from "../dtos/request/patch.web-client-logo.request.dto";

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

  describe('updateLogo', () => {
    const user: number = 1;
    const mockDto: PatchWebClientLogoRequestDto = {
      logo: 1
    };

    it('should update the logo', async () => {
      // Arrange
      service.updateLogo.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateLogo(user, mockDto);

      // Assert
      expect(service.updateLogo).toHaveBeenCalledWith(user, mockDto);
      expect(result).toEqual({});
    });
  });
});