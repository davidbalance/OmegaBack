import { TestBed } from "@automock/jest";
import { WebClientResourceService } from "../web-client-resource.service";
import { WebClientRepository } from "../../repositories/web-client.repository";
import { WebResourceService } from "@/omega-web/web-resource/services/web-resource.service";
import { mockWebClient } from "./stub/web-client.stub";
import { PatchWebClientResourceRequestDto } from "../../dtos/request/patch.web-client-resource.request.dto";
import { mockWebResourceArray } from "@/omega-web/web-resource/services/test/stub/web-resource.stub";

describe('WebClientResourceService', () => {
    let service: WebClientResourceService;
    let repository: jest.Mocked<WebClientRepository>;
    let resourceService: jest.Mocked<WebResourceService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(WebClientResourceService).compile();

        service = unit;
        repository = unitRef.get(WebClientRepository);
        resourceService = unitRef.get(WebResourceService);
    });

    describe('findAll', () => {
        const userId = 1;
        const mockedClient = mockWebClient();
        const mockedWebResources = mockWebResourceArray();

        it('should return the resources for a given user', async () => {
            // Arrange
            repository.findOne.mockResolvedValue({ ...mockedClient, resources: mockedWebResources });

            // Act
            const result = await service.findAll(userId);

            // Assert
            expect(result).toEqual(mockedWebResources);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { user: userId },
                select: { resources: { id: true, label: true } },
            });
        });
    });

    describe('updateResources', () => {
        const userId = 1;
        const resourceIds = [1, 2];
        const mockedWebResources = mockWebResourceArray();
        const updateDto: PatchWebClientResourceRequestDto = { resources: resourceIds };

        it('should update the resources for a given user', async () => {
            // Arrange
            resourceService.findInIds.mockResolvedValue(mockedWebResources);
            repository.findOneAndUpdate.mockResolvedValue(undefined);

            // Act
            await service.updateResources(userId, updateDto);

            // Assert
            expect(resourceService.findInIds).toHaveBeenCalledWith(resourceIds);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
                { user: userId },
                { resources: mockedWebResources }
            );
        });
    });
});