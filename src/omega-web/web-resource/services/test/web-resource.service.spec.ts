import { TestBed } from "@automock/jest";
import { WebResourceRespository } from "../../repositories/web-resource.repository";
import { WebResourceService } from "../web-resource.service";
import { mockWebResource, mockWebResources } from "./stub/web-resource.stub";
import { In } from "typeorm";
import { PostWebResourceRequestDto } from "../../dtos/request/post.web-resource.request.dto";
import { PatchWebResourceRequestDto } from "../../dtos/request/patch.web-resource.request.dto";

describe('WebResourceService', () => {
    let service: WebResourceService;
    let repository: jest.Mocked<WebResourceRespository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(WebResourceService).compile();

        service = unit;
        repository = unitRef.get(WebResourceRespository);
    });

    describe('findInNames', () => {
        const mockedWebResources = mockWebResources();
        const names = ['Resource1', 'Resource2'];


        it('should return an array of web resources filtered by names', async () => {
            // Arrange
            repository.find.mockResolvedValueOnce(mockedWebResources);

            // Act
            const resources = await service.findInNames(names);

            // Assert
            expect(resources).toEqual(mockedWebResources);
            expect(repository.find).toHaveBeenCalledWith({ where: { name: In(names) } });
        });
    });

    describe('findInIds', () => {
        const mockedWebResources = mockWebResources();
        const ids = [1, 2, 3];

        it('should return an array of web resources filtered by ids', async () => {
            // Arrange
            repository.find.mockResolvedValueOnce(mockedWebResources);

            // Act
            const resources = await service.findInIds(ids);

            // Assert
            expect(resources).toEqual(mockedWebResources);
            expect(repository.find).toHaveBeenCalledWith({ where: { id: In(ids) } });
        });
    });

    describe('findAll', () => {
        const mockedWebResources = mockWebResources();

        it('should return an array of web resources ordered by status', async () => {
            // Arrange
            repository.find.mockResolvedValueOnce(mockedWebResources);

            // Act
            const resources = await service.findAll();

            // Assert
            expect(resources).toEqual(mockedWebResources);
            expect(repository.find).toHaveBeenCalledWith({ order: { status: 'DESC' } });
        });
    });

    describe('create', () => {
        const mockedWebResource = mockWebResource();
        const mockDto: PostWebResourceRequestDto = {
            name: "mock-resource",
            label: "Mocked Label",
            address: "mocked/resource",
            icon: "mocked-icon"
        }

        it('should create and return a new web resource', async () => {
            // Arrange
            repository.create.mockResolvedValueOnce(mockedWebResource);

            // Act
            const resource = await service.create(mockDto);

            // Assert
            expect(resource).toEqual(mockedWebResource);
            expect(repository.create).toHaveBeenCalledWith(mockDto);
        });
    });

    describe('updateOne', () => {
        const id = 1;
        const mockedWebResource = mockWebResource();
        const mockDto: PatchWebResourceRequestDto = {
            name: "mock-resource"
        }

        it('should update and return the web resource by id', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedWebResource);

            // Act
            const resource = await service.updateOne(id, mockDto);

            // Assert
            expect(resource).toEqual(mockedWebResource);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockDto);
        });
    });

    describe('deleteOne', () => {
        const id = 1;
        it('should delete the web resource by id', async () => {
            // Arrange
            repository.findOneAndDelete.mockResolvedValue(undefined);

            // Act
            await service.deleteOne(id);

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
        });
    });
});
