/* import { TestBed } from "@automock/jest";
import { DiseaseGroupRepository } from "../../repository/disease-group.repository";
import { DiseaseGroupManagementService } from "../disease-group-management.service";
import { mockDiseaseGroup, mockDiseaseGroups } from "./stub/disease-group.stub";
import { PatchDiseaseGroupRequestDto } from "../../dtos/request/disease-group.patch.request.dto";
import { PostDiseaseGroupRequestDto } from "../../dtos/request/disease-group.post.request.dto"; */

import { TestBed } from "@automock/jest";
import { DiseaseGroupManagementService } from "../disease-group-management.service";

describe('DiseaseGroupManagementService', () => {
  let service: DiseaseGroupManagementService;

  beforeEach(async () => {
    const { unit } = TestBed.create(DiseaseGroupManagementService).compile();
    service = unit;
  });

  it('', () => {
    expect(service).toBeDefined();
  });
  /*  let repository: jest.Mocked<DiseaseGroupRepository>;
 
   beforeEach(async () => {
     const { unit, unitRef } = TestBed.create(DiseaseGroupManagementService).compile();
 
     service = unit;
     repository = unitRef.get(DiseaseGroupRepository);
   });
 
   afterEach(() => {
     jest.clearAllMocks();
   });
 
   describe('create', () => {
     const mockedGroup = mockDiseaseGroup();
     const mockDto: PostDiseaseGroupRequestDto = {
       name: "my-mocked-group"
     }
 
     it('should create a disease groups', async () => {
       // Arrange
       repository.create.mockResolvedValueOnce(mockedGroup);
 
       // Act
       const result = await service.create(mockDto);
 
       // Assert
       expect(result).toEqual(mockedGroup);
       expect(repository.create).toHaveBeenCalledWith(mockDto);
     });
   });
 
   describe('find', () => {
     const mockedGroups = mockDiseaseGroups();
 
     beforeEach(() => {
       repository.query.mockReturnValue({
         leftJoinAndSelect: jest.fn().mockReturnThis(),
         select: jest.fn().mockReturnThis(),
         cache: jest.fn().mockReturnThis(),
         where: jest.fn().mockReturnThis(),
         getMany: jest.fn().mockResolvedValueOnce(mockedGroups),
       } as any);
     })
 
     it('should return an array of disease groups', async () => {
       // Arrange
       // Act
       const result = await service.find();
 
       // Assert
       expect(result).toEqual(mockedGroups);
       expect(repository.query).toHaveBeenCalledTimes(1);
       expect(repository.query).toHaveBeenCalledWith('group');
       expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('group.diseases', 'disease', 'disease.status = :diseaseStatus', { diseaseStatus: true });
       expect(repository.query().select).toHaveBeenCalledWith(['group.id', 'group.name', 'disease.id', 'disease.name']);
       expect(repository.query().cache).toHaveBeenCalledWith('disease-group-find-all-cache', 1000 * 60 * 15);
       expect(repository.query().where).toHaveBeenCalledWith('group.status = :status', { status: true });
       expect(repository.query().getMany).toHaveBeenCalled();
     });
 
   });
 
   describe('findOneById', () => {
     const id: number = 1;
     const mockedGroup = mockDiseaseGroup();
 
     it('should return a disease groups', async () => {
       // Arrange
       repository.findOne.mockResolvedValueOnce(mockedGroup);
 
       // Act
       const result = await service.findOneById(id);
 
       // Assert
       expect(result).toEqual(mockedGroup);
       expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
     });
   });
 
   describe('updateOne', () => {
     const id: number = 1;
 
     const mockDto: PatchDiseaseGroupRequestDto = {
       name: 'my-updated-mock'
     }
 
     const mockedGroup = mockDiseaseGroup();
 
     it('should update a disease group and return it', async () => {
       // Arrange
       repository.findOneAndUpdate.mockResolvedValueOnce(mockedGroup);
 
       // Act
       const result = await service.updateOne(id, mockDto);
 
       // Assert
       expect(result).toEqual(mockedGroup);
       expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, mockDto);
     });
   });
 
   describe('deleteOne', () => {
     const id: number = 1;
 
     it('should delete a disease group', async () => {
       // Arrange
       // Act
       await service.deleteOne(id);
       
       // Assert
       expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
     });
   });
  */
});