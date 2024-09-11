import { TestBed } from "@automock/jest";
import { ApiKeyManagementController } from "./api-key-management.controller";

describe('ApiKeyManagementController', () => {
  let controller: ApiKeyManagementController;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ApiKeyManagementController).compile();

    controller = unit;
  });

  it('to be defined', () => {
    expect(controller).toBeDefined();
  })

  /*  beforeEach(async () => {
     const { unit, unitRef } = TestBed.create(ApiKeyManagementController).compile();
 
     controller = unit;
     service = unitRef.get(ApiKeyManagementService);
   });
 
   beforeEach(() => {
     jest.clearAllMocks();
   });
 
   describe('find', () => {
     const mockedApiKey = [{ name: 'mocked-api-key' }];
 
     it('should call service.findAll and return GetApiKeyArrayResponseDto', async () => {
       // Arrange
       const user = 1;
       const expectedResponse = plainToInstance(GetApiKeyArrayResponseDto, {
         data: mockedApiKey,
       });
       service.findAll.mockResolvedValue(mockedApiKey);
 
       // Act
       const result = await controller.find(user);
 
       // Assert
       expect(service.findAll).toHaveBeenCalledWith(user);
       expect(result).toEqual(expectedResponse);
     });
   });
 
   describe('create', () => {
     const mockedApikey: ApiKey = {
       id: 1,
       value: "mocked-api-key",
       name: "mocked-api-key",
       expiresAt: new Date(),
       status: false,
       credential: undefined,
       createAt: new Date(),
       updateAt: new Date()
     };
 
     it('should call service.create and return PostApiKeyResponseDto', async () => {
       // Arrange
       const user = 1;
       const body: PostApiKeyRequestDto = { name: 'Test API Key' };
       const expectedResponse = plainToInstance(PostApiKeyResponseDto, {
         ...mockedApikey,
         apikey: mockedApikey.value,
       });
 
       service.create.mockResolvedValue(mockedApikey);
 
       // Act
       const result = await controller.create(body, user);
 
       // Assert
       expect(service.create).toHaveBeenCalledWith(user, body);
       expect(result).toEqual(expectedResponse);
     });
   });
 
   describe('findOneAndUpdate', () => {
     const mockedApikey: ApiKey = {
       id: 1,
       value: "mocked-api-key",
       name: "mocked-api-key",
       expiresAt: new Date(),
       status: false,
       credential: undefined,
       createAt: new Date(),
       updateAt: new Date()
     };
 
     it('should call service.updateOne and return PatchApiKeyResponseDto', async () => {
       // Arrange
       const id = 1;
       const body: PatchApiKeyRequestDto = { name: 'Updated API Key' };
       const expectedResponse = plainToInstance(PatchApiKeyResponseDto, {
         name: 'test-api-key'
       });
 
       service.updateOne.mockResolvedValue({ name: 'test-api-key' });
 
       // Act
       const result = await controller.findOneAndUpdate(id, body);
 
       // Assert
       expect(service.updateOne).toHaveBeenCalledWith(id, body);
       expect(result).toEqual(expectedResponse);
     });
   }); */
});