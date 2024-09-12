import { TestBed } from "@automock/jest";
import { AreaManagementService } from "../area-management.service";

describe('AreaManagementService', () => {
  let service: AreaManagementService;

  beforeEach(async () => {
    const { unit } = TestBed.create(AreaManagementService).compile();
    service = unit;
  });

  it('', () => {
    expect(service).toBeDefined();
  })
  /*   let repository: jest.Mocked<AreaRepository>;
    let managementService: jest.Mocked<ManagementService>;
  
    beforeEach(async () => {
      const { unit, unitRef } = TestBed.create(AreaManagementService).compile();
  
      service = unit;
      repository = unitRef.get(AreaRepository);
      managementService = unitRef.get(ManagementService);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('create', () => {
      const mockDto: PostAreaRequestDto = {
        name: 'New Area',
        management: 1
      }
      const mockedArea = mockArea();
      const mockedManagement = mockManagement();
  
      it('should create a new area', async () => {
        // Arrange
        managementService.findOne.mockResolvedValue(mockedManagement);
        repository.create.mockResolvedValue(mockedArea);
  
        // Act
        const result = await service.create(mockDto);
  
        // Assert
        expect(managementService.findOne).toHaveBeenCalledWith(mockDto.management);
        expect(repository.create).toHaveBeenCalledWith({ ...mockDto, management: mockedManagement });
        expect(result).toEqual(mockedArea);
      });
    });
  
    describe('find', () => {
      const mockedAreas = mockAreas();
  
      it('should find all areas', async () => {
        // Arrange
        repository.find.mockResolvedValue(mockedAreas);
  
        // Act
        const result = await service.find();
  
        // Assert
        expect(repository.find).toHaveBeenCalled();
        expect(result).toEqual(mockedAreas);
      });
    });
  
    describe('updateOne', () => {
      const id: number = 1;
      const mockDto: PatchAreaRequestDto = {
        name: "mocked-name",
        management: 1
      }
      const mockedArea = mockArea();
      const mockedManagement = mockManagement();
  
      it('should update an area', async () => {
        // Arrange
        managementService.findOne.mockResolvedValue(mockedManagement);
        repository.findOneAndUpdate.mockResolvedValue(mockedArea);
  
        // Act
        const result = await service.updateOne(id, mockDto);
  
        // Assert
        expect(managementService.findOne).toHaveBeenCalledWith(mockDto.management);
        expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, { ...mockDto, management: mockedManagement });
        expect(result).toEqual(mockedArea);
      });
  
    });
  
    describe('deleteOne', () => {
      const id: number = 1;
  
      it('should delete an area', async () => {
        // Arrange
        repository.findOneAndDelete.mockResolvedValue(undefined);
  
        // Act
        await service.deleteOne(id);
  
        // Assert
        expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
      });
    }); */
});