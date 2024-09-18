import { WebLogoService } from "@/omega-web/web-logo/services/web-logo.service";
import { WebClientRepository } from "../repositories/web-client.repository";
import { WebClientLogoService } from "./web-client-logo.service";
import { TestBed } from "@automock/jest";
import { mockWebClientEntity } from "../stub/web-client-entity.stub";
import { mockWebLogoEntity } from "@/omega-web/web-logo/stub/web-logo.stub";

describe('WebClientLogoService', () => {
  let service: WebClientLogoService;
  let repository: jest.Mocked<WebClientRepository>;
  let logoService: jest.Mocked<WebLogoService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WebClientLogoService).compile();

    service = unit;
    repository = unitRef.get(WebClientRepository);
    logoService = unitRef.get(WebLogoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findLogo', () => {
    it('should find logo', async () => {
      // Arrange
      const userId = 1;
      const mockedData = mockWebClientEntity();
      repository.findOne.mockResolvedValue(mockedData);

      // Act
      const result = await service.findLogo(userId);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { user: userId } });
      expect(result).toEqual(mockedData.logo.name);
    });
  });

  describe('updateLogo', () => {
    it('should update logo', async () => {
      // Arrange
      const userId = 1;
      const logoId = 1;
      const mockedData = mockWebLogoEntity();
      logoService.findOne.mockResolvedValue(mockedData);

      // Act
      await service.updateLogo(userId, { logo: logoId });

      // Assert
      expect(logoService.findOne).toHaveBeenCalledWith(logoId);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
        { user: userId },
        { logo: mockedData }
      );
    });
  });
});