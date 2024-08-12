import { TestBed } from "@automock/jest";
import { DoctorManagementService } from "../services/doctor-management.service";
import { DoctorManagementController } from "./doctor-management.controller";
import { mockDoctorArray } from "../services/test/stub/doctor.stub";
import { GetDoctorArrayResponseDto } from "../dtos/response/get.doctor-array.response.dto";
import { DoctorResponseDto } from "../dtos/response/base.doctor.response.dto";

describe('DoctorManagementController', () => {
  let controller: DoctorManagementController;
  let service: jest.Mocked<DoctorManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorManagementController).compile();

    controller = unit;
    service = unitRef.get(DoctorManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedData = mockDoctorArray();
    const mockedDataFlat: DoctorResponseDto[] = mockedData.map(e => ({
      ...e.user,
      ...e,
      user: e.user.id
    }));
    const expectedResult: GetDoctorArrayResponseDto = { data: mockedDataFlat };

    it('should find all doctors', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedDataFlat);

      // Act
      const result = await controller.find();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

});