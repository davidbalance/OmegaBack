import { WebLogoService } from "@/omega-web/web-logo/services/web-logo.service";
import { WebClientRepository } from "../../repositories/web-client.repository";
import { WebClientLogoService } from "../web-client-logo.service";
import { TestBed } from "@automock/jest";
import { mockWebLogo } from "@/omega-web/web-logo/services/test/stub/web-logo.stub";
import { PatchWebClientLogoRequestDto } from "../../dtos/request/patch.web-client-logo.request.dto";

describe('WebClientLogoService', () => {
    let service: WebClientLogoService;
    let clientRepository: jest.Mocked<WebClientRepository>;
    let logoService: jest.Mocked<WebLogoService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(WebClientLogoService).compile();

        service = unit;
        clientRepository = unitRef.get(WebClientRepository);
        logoService = unitRef.get(WebLogoService);
    });

    describe('updateLogo', () => {
        const userId = 1;
        const logoId = 2;
        const mockedLogo = mockWebLogo();
        const mockDto: PatchWebClientLogoRequestDto = { logo: logoId };

        it('should update the logo for a given user', async () => {
            // Arrange
            logoService.findOne.mockResolvedValue(mockedLogo);
            clientRepository.findOneAndUpdate.mockResolvedValue(undefined);

            // Act
            await service.updateLogo(userId, mockDto);

            // Assert
            expect(logoService.findOne).toHaveBeenCalledWith(logoId);
            expect(clientRepository.findOneAndUpdate).toHaveBeenCalledWith(
                { user: userId },
                { logo: mockedLogo }
            );
        });
    });
});