import { TestBed } from "@automock/jest";
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorOptionService } from "./doctor-option.service";
import { mockDoctorEntities } from "../stub/doctor-entity.stub";

describe('DoctorOptionService', () => {
  let service: DoctorOptionService;
  let repository: jest.Mocked<DoctorRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorOptionService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedDoctorEntities = mockDoctorEntities();
    const expectedValue = mockedDoctorEntities.map(e => ({ ...e.user, ...e, user: e.user.id }));

    it('should return an array of Doctor', async () => {
      // Arrange
      repository.find.mockResolvedValue(mockedDoctorEntities);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalledWith({ where: { user: { status: true } } });
      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedValue));
    });
  });
});
