import { UserManagementService } from "@/user/user/services/user-management.service";
import { PatientRepository } from "../repositories/patient.repository";
import { PatientManagementService } from "./patient-management.service";
import { TestBed } from "@automock/jest";
import { PatientRequestDto } from "../dtos/request/patient.base.dto";
import { PatientGenderEnum } from "../enums/patient.enum";
import { mockUserEntity } from "@/user/user/stub/user-entity.stub";
import { mockPatientEntities, mockPatientEntity } from "../stub/patient-entity.stub";
import { PatchPatientRequestDto } from "../dtos/request/patient.patch.dto";

describe('PatientManagementService', () => {
  let service: PatientManagementService;
  let repository: jest.Mocked<PatientRepository>;
  let userService: jest.Mocked<UserManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientManagementService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
    userService = unitRef.get(UserManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDto: PatientRequestDto = {
      name: 'John',
      lastname: 'Doe',
      dni: '1234567890',
      birthday: new Date(),
      gender: PatientGenderEnum.MALE,
      role: 'patient'
    };

    const mockedUser = mockUserEntity();
    const mockedPatientData = mockPatientEntity();
    const expectedData = { ...mockedPatientData.user, ...mockedPatientData, user: mockedPatientData.user.id };

    it('should create a patient with an existing user', async () => {
      // Arrange
      userService.findOneByDni.mockResolvedValue(mockedUser);
      repository.create.mockResolvedValue(mockedPatientData);
      const { birthday, gender, ...mockUser } = mockDto;

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(repository.create).toHaveBeenCalledWith({ birthday, gender, user: { dni: mockedUser.dni } });
      expect(result).toEqual(expectedData);
    });

    it('should create a patient with a new user', async () => {
      // Arrange
      userService.findOneByDni.mockRejectedValue(new Error('User not found'));
      userService.create.mockResolvedValue(mockedUser);
      repository.create.mockResolvedValue(mockedPatientData);
      const { birthday, gender, ...mockUser } = mockDto;

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(userService.findOneByDni).toHaveBeenCalledWith(mockDto.dni);
      expect(userService.create).toHaveBeenCalledWith({ ...mockUser, role: mockUser.role, email: null });
      expect(repository.create).toHaveBeenCalledWith({ birthday, gender, user: { dni: mockedUser.dni } });
      expect(result).toEqual(expectedData);
    });
  });

  describe('findByExtraAttribute', () => {
    const name = 'someAttribute';
    const value = 'someValue';
    const mockedPatientsData = mockPatientEntities();
    const expectedData = mockedPatientsData.map(({ user, ...data }) => ({ ...user, ...data, user: user.id }));

    it('should find patients by extra attribute', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedPatientsData);

      // Act
      const result = await service.findByExtraAttribute(name, value);

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          user: {
            extraAttributes: { name: name, value: value },
            status: true,
          }
        },
        select: {
          id: true,
          birthday: true,
          gender: true,
          user: { id: true, dni: true, email: true, lastname: true, name: true }
        },
      });
      expect(result).toEqual(expectedData);
    });
  });

  describe('findOneByDni', () => {
    const dni = '1234567890';
    const mockedPatientData = mockPatientEntity();
    const expectedData = { ...mockedPatientData.user, ...mockedPatientData, user: mockedPatientData.user.id };

    it('should find a patient by DNI', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedPatientData);

      // Act
      const result = await service.findOneByDni(dni);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          user: { dni: dni }
        },
        select: {
          id: true,
          birthday: true,
          gender: true,
          user: { id: true, dni: true, email: true, lastname: true, name: true }
        }
      });
      expect(result).toEqual(expectedData);
    });
  });

  describe('updateOne', () => {
    const dni = '1234567890';
    const mockedPatient = mockPatientEntity();
    const mockDto: PatchPatientRequestDto = mockedPatient;
    const mockedUser = mockUserEntity();
    const expectedData = { ...mockedUser, ...mockedPatient, user: mockedUser.id };

    it('should update a patient', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockedPatient);
      userService.updateOne.mockResolvedValue(mockedUser);
      repository.findOneAndUpdate.mockResolvedValue(mockedPatient);
      const { birthday, gender, ...mockUser } = mockDto;

      // Act
      const result = await service.updateOne(dni, mockDto);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { user: { dni: dni } }, relations: { user: true } });
      expect(userService.updateOne).toHaveBeenCalledWith(mockedPatient.user.id, { ...mockUser, email: null });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ user: { dni: dni } }, { birthday: mockedPatient.birthday, gender: mockedPatient.gender });
      expect(result).toEqual(expectedData);
    });
  });
});