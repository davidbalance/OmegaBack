import { TestBed } from "@automock/jest";
import { DoctorOptionService } from "../services/doctor-option.service";
import { DoctorOptionController } from "./doctor-option.controller";
import { mockDoctors } from "../stub/doctor.stub";

describe('DoctorOptionController', () => {
  let controller: DoctorOptionController;
  let service: jest.Mocked<DoctorOptionService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorOptionController).compile();

    controller = unit;
    service = unitRef.get(DoctorOptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {

    const mockedDoctors = mockDoctors();
    const expectedData = mockedDoctors;

    it('should call the service to find all the options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedDoctors);

      // Act
      const result = await controller.find();

      // Assert
      expect(result).toEqual({ data: expectedData });
    });
  });
});