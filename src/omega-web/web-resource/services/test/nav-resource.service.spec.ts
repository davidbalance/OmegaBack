import { TestBed } from "@automock/jest";
import { WebResourceRespository } from "../../repositories/web-resource.repository";
import { NavResourceService } from "../nav-resource.service";
import { mockWebResourceArray } from "./stub/web-resource.stub";

describe('NavResourceService', () => {
    let service: NavResourceService;
    let repository: jest.Mocked<WebResourceRespository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(NavResourceService).compile();

        service = unit;
        repository = unitRef.get(WebResourceRespository);
    });

    describe('findAll', () => {
        const mockedWebResources = mockWebResourceArray();

        it('should return an array of web resources', async () => {
            // Arrange
            repository.find.mockResolvedValueOnce(mockedWebResources);

            // Act
            const resources = await service.findAll();

            // Assert
            expect(resources).toEqual(mockedWebResources);
            expect(repository.find).toHaveBeenCalledWith({
                where: {
                    show: true,
                    status: true,
                },
            });
        });
    });
});