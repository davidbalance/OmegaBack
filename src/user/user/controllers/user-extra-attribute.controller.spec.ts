import { TestBed } from "@automock/jest";
import { UserExtraAttributeService } from "../services/user-extra-attributes.service";
import { UserExtraAttributeController } from "./user-extra-attribute.controller";
import { mockUserAttribute } from "../services/test/stub/user-extra-attribute.stub";
import { GetUserAttributeResponseDto } from "../dtos/response/get.user-extra-attribute.response.dto";
import { PatchUserExtraAttributeRequestDto } from "../dtos/request/patch.user-extra-attribute.request.dto";

describe('UserExtraAttributeController', () => {
  let controller: UserExtraAttributeController;
  let service: jest.Mocked<UserExtraAttributeService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserExtraAttributeController).compile();

    controller = unit;
    service = unitRef.get(UserExtraAttributeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findLookForCompanyAttribute', () => {
    const id: number = 1;
    const mockedAttribute = mockUserAttribute();
    const expectResult: GetUserAttributeResponseDto = mockedAttribute;

    it('should find the look for company attribute', async () => {
      // Arrange
      service.findUserAttribute.mockResolvedValue(mockedAttribute);

      // Act
      const result = await controller.findLookForCompanyAttribute(id);

      // Assert
      expect(service.findUserAttribute).toHaveBeenCalledWith(id, 'look_for_company');
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOneAndUpdateLookForCompanyAttribute', () => {
    const id: number = 1;
    const mockDto: PatchUserExtraAttributeRequestDto = {
      value: '1234567890'
    };

    it('should update the look for company attribute', async () => {
      // Arrange
      service.assignAttribute.mockResolvedValue(undefined);

      // Act
      const result = await controller.findOneAndUpdateLookForCompanyAttribute(id, mockDto);

      // Assert
      expect(service.assignAttribute).toHaveBeenCalledWith(id, { name: 'look_for_company', ...mockDto });
      expect(result).toEqual({});
    });
  });

  describe('findEmployeeOfAttribute', () => {
    const id: number = 1;
    const mockedAttribute = mockUserAttribute();
    const expectResult: GetUserAttributeResponseDto = mockedAttribute;

    it('should find the employee of attribute', async () => {
      // Arrange
      service.findUserAttribute.mockResolvedValue(mockedAttribute);

      // Act
      const result = await controller.findEmployeeOfAttribute(id);

      // Assert
      expect(service.findUserAttribute).toHaveBeenCalledWith(id, 'employee_of');
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOneAndUpdateEmployeeOfAttribute', () => {
    const id: number = 1;
    const mockDto: PatchUserExtraAttributeRequestDto = {
      value: '1234567890'
    };

    it('should update the employee of attribute', async () => {
      // Arrange
      service.assignAttribute.mockResolvedValue(undefined);

      // Act
      const result = await controller.findOneAndUpdateEmployeeOfAttribute(id, mockDto);

      // Assert
      expect(service.assignAttribute).toHaveBeenCalledWith(id, { name: 'employee_of', ...mockDto });
      expect(result).toEqual({});
    });
  });

  describe('findDoctorOfAttribute', () => {
    const id: number = 1;
    const mockedAttribute = mockUserAttribute();
    const expectResult: GetUserAttributeResponseDto = mockedAttribute;

    it('should find the doctor of attribute', async () => {
      // Arrange
      service.findUserAttribute.mockResolvedValue(mockedAttribute);

      // Act
      const result = await controller.findDoctorOfAttribute(id);

      // Assert
      expect(service.findUserAttribute).toHaveBeenCalledWith(id, 'doctor_of');
      expect(result).toEqual(expectResult);
    });
  });

  describe('findOneAndUpdateDoctorOfAttribute', () => {
    const id: number = 1;
    const mockDto: PatchUserExtraAttributeRequestDto = {
      value: '1234567890'
    };

    it('should update the doctor of attribute', async () => {
      // Arrange
      service.assignAttribute.mockResolvedValue(undefined);

      // Act
      const result = await controller.findOneAndUpdateDoctorOfAttribute(id, mockDto);

      // Assert
      expect(service.assignAttribute).toHaveBeenCalledWith(id, { name: 'doctor_of', ...mockDto });
      expect(result).toEqual({});
    });
  });
});