import { TestBed } from "@automock/jest";
import { WebResourceRespository } from "../repositories/web-resource.repository";
import { WebResourceService } from "./web-resource.service";
import { mockWebResourceEntities, mockWebResourceEntity } from "../stub/web-resource-entity.stub";
import { WebResourceRequestDto } from "../dtos/request/web-resource.base.dto";
import { PatchWebResourceRequestDto } from "../dtos/request/web-resource.patch.dto";
import { In } from "typeorm";

describe('WebResourceService', () => {
  let service: WebResourceService;
  let repository: jest.Mocked<WebResourceRespository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WebResourceService).compile();

    service = unit;
    repository = unitRef.get(WebResourceRespository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find resources by names', async () => {
    // Arrange
    const names = ['resource1', 'resource2'];
    const mockedData = mockWebResourceEntities();
    repository.find.mockResolvedValue(mockedData);

    // Act
    const result = await service.findInNames(names);

    // Assert
    expect(repository.find).toHaveBeenCalledWith({ where: { name: In(names) } });
    expect(result).toEqual(mockedData);
  });

  it('should find resources by ids', async () => {
    // Arrange
    const ids = [1, 2, 3];
    const mockedData = mockWebResourceEntities();
    repository.find.mockResolvedValue(mockedData);

    // Act
    const result = await service.findInIds(ids);

    // Assert
    expect(repository.find).toHaveBeenCalledWith({ where: { id: In(ids) } });
    expect(result).toEqual(mockedData);
  });

  it('should find all resources', async () => {
    // Arrange
    const mockedData = mockWebResourceEntities();
    repository.find.mockResolvedValue(mockedData);

    // Act
    const result = await service.find();

    // Assert
    expect(repository.find).toHaveBeenCalledWith({ order: { status: 'DESC' } });
    expect(result).toEqual(mockedData);
  });

  it('should find a resource by id', async () => {
    // Arrange
    const id = 1;
    const mockedData = mockWebResourceEntity();
    repository.findOne.mockResolvedValue(mockedData);

    // Act
    const result = await service.findOne(id);

    // Assert
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual(mockedData);
  });

  it('should create a resource', async () => {
    // Arrange
    const data: Partial<WebResourceRequestDto> = { name: 'new resource' };
    const mockedData = mockWebResourceEntity();
    repository.create.mockResolvedValue(mockedData);

    // Act
    const result = await service.create(data);

    // Assert
    expect(repository.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockedData);
  });

  it('should update a resource', async () => {
    // Arrange
    const id = 1;
    const data: PatchWebResourceRequestDto = { name: 'updated resource' };
    const mockedData = mockWebResourceEntity();
    repository.findOneAndUpdate.mockResolvedValue(mockedData);

    // Act
    const result = await service.updateOne(id, data);

    // Assert
    expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { ...data });
    expect(result).toEqual(mockedData);
  });

  it('should delete a resource', async () => {
    // Arrange
    const id = 1;

    // Act
    await service.deleteOne(id);

    // Assert
    expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
  });
});