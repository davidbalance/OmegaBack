import { ManagementController } from "./management.controller";

describe('ManagementController', () => {
  let controller: ManagementController;
  it('', () => {
    expect(controller).toBeDefined();
  })
  /*  let service: jest.Mocked<ManagementService>;
 
   beforeEach(async () => {
     const { unit, unitRef } = TestBed.create(ManagementController).compile();
 
     controller = unit;
     service = unitRef.get(ManagementService);
   });
 
   afterEach(() => {
     jest.clearAllMocks();
   });
 
   describe('create', () => {
     const body: PostManagementRequestDto = {
       name: 'Management Name'
     };
     const mockedManagement = mockManagement();
 
     it('should create a management', async () => {
       // Arrange
       service.create.mockResolvedValueOnce(mockedManagement);
 
       // Act
       const result = await controller.create(body);
 
       // Assert
       expect(result).toEqual(mockedManagement);
       expect(service.create).toHaveBeenCalledWith(body);
     });
   });
 
   describe('findAll', () => {
     const mockedManagements = mockManagements();
 
     it('should return all managements', async () => {
       // Arrange
       service.find.mockResolvedValueOnce(mockedManagements);
 
       // Act
       const result = await controller.findAll();
 
       // Assert
       expect(result).toEqual({
         data: mockedManagements
       });
       expect(service.find).toHaveBeenCalled();
     });
   });
 
   describe('updateOne', () => {
     const id = 1;
     const body: PatchMagementRequestDto = {
       name: 'Updated Management Name'
     };
     const mockedManagement = mockManagement();
 
     it('should update a management', async () => {
       // Arrange
       service.updateOne.mockResolvedValueOnce(mockedManagement);
 
       // Act
       const result = await controller.updateOne(id, body);
 
       // Assert
       expect(result).toEqual(mockedManagement);
       expect(service.updateOne).toHaveBeenCalledWith(id, body);
     });
   });
 
   describe('deleteOne', () => {
     const id = 1;
 
     it('should delete a management', async () => {
       // Arrange
       service.deleteOne.mockResolvedValueOnce(undefined);
 
       // Act
       const result = await controller.deleteOne(id.toString());
 
       // Assert
       expect(result).toEqual({});
       expect(service.deleteOne).toHaveBeenCalledWith(id);
     });
   }); */
});