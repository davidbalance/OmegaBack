import { TestBed } from "@automock/jest";
import { UserExtraAttributeService } from "../services/user-extra-attributes.service";
import { UserExtraAttributeController } from "./user-extra-attribute.controller";
import { PatchUserExtraAttributeRequestDto } from "../dtos/request/user-attribute.patch.dto";
import { mockUserAttribute } from "../stub/user-attribute.stub";

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

  it('should find look_for_company attribute', async () => {
    // Arrange
    const userId = 1;
    const mockedAttribute = mockUserAttribute();
    service.findAttribute.mockResolvedValue(mockedAttribute);

    // Act
    const result = await controller.findLookForCompanyAttribute(userId);

    // Assert
    expect(service.findAttribute).toHaveBeenCalledWith(userId, 'look_for_company');
    expect(result).toEqual(expect.objectContaining({
      ...mockedAttribute
    }));
  });

  it('should update look_for_company attribute', async () => {
    // Arrange
    const userId = 1;
    const mockDto: PatchUserExtraAttributeRequestDto = { value: 'true' };
    service.assignAttribute.mockResolvedValue(undefined);

    // Act
    const result = await controller.findOneAndUpdateLookForCompanyAttribute(userId, mockDto);

    // Assert
    expect(service.assignAttribute).toHaveBeenCalledWith(userId, { name: 'look_for_company', ...mockDto });
    expect(result).toEqual({});
  });

  it('should find employee_of attribute', async () => {
    // Arrange
    const userId = 1;
    const mockedAttribute = mockUserAttribute();
    service.findAttribute.mockResolvedValue(mockedAttribute);

    // Act
    const result = await controller.findEmployeeOfAttribute(userId);

    // Assert
    expect(service.findAttribute).toHaveBeenCalledWith(userId, 'employee_of');
    expect(result).toEqual(expect.objectContaining({
      ...mockedAttribute
    }));
  });

  it('should update employee_of attribute', async () => {
    // Arrange
    const userId = 1;
    const mockDto: PatchUserExtraAttributeRequestDto = { value: 'company-id' };
    service.assignAttribute.mockResolvedValue(undefined);

    // Act
    const result = await controller.findOneAndUpdateEmployeeOfAttribute(userId, mockDto);

    // Assert
    expect(service.assignAttribute).toHaveBeenCalledWith(userId, { name: 'employee_of', ...mockDto });
    expect(result).toEqual({});
  });

  it('should find doctor_of attribute', async () => {
    // Arrange
    const userId = 1;
    const mockedAttribute = mockUserAttribute();
    service.findAttribute.mockResolvedValue(mockedAttribute);

    // Act
    const result = await controller.findDoctorOfAttribute(userId);

    // Assert
    expect(service.findAttribute).toHaveBeenCalledWith(userId, 'doctor_of');
    expect(result).toEqual(expect.objectContaining({
      ...mockedAttribute
    }));
  });

  it('should update doctor_of attribute', async () => {
    // Arrange
    const userId = 1;
    const mockDto: PatchUserExtraAttributeRequestDto = { value: 'sanatorium-id' };
    service.assignAttribute.mockResolvedValue(undefined);

    // Act
    const result = await controller.findOneAndUpdateDoctorOfAttribute(userId, mockDto);

    // Assert
    expect(service.assignAttribute).toHaveBeenCalledWith(userId, { name: 'doctor_of', ...mockDto });
    expect(result).toEqual({});
  });
});
