import { TestBed } from "@automock/jest";
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorPaginationService } from "./doctor-pagination.service";
import { mockDoctorEntities } from "../stub/doctor-entity.stub";
import { Brackets } from "typeorm";

describe('DoctorPaginationService', () => {
  let service: DoctorPaginationService;
  let repository: jest.Mocked<DoctorRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorPaginationService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedDoctors = mockDoctorEntities();
    const expectedData = mockedDoctors;

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedDoctors)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.find({ search, page, take }, extras);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('doctor');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('doctor.user', 'user');
      expect(repository.query().select).toHaveBeenCalledWith('doctor.id', 'id');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'doctor.hasFile', 'hasFile');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'user.id', 'user');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(3, 'user.dni', 'dni');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(4, 'user.email', 'email');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(5, 'user.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(6, 'user.lastname', 'lastname');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(7, 'user.hasCredential', 'hasCredential');
      expect(repository.query().where).toHaveBeenCalled();
      expect(repository.query().limit).toHaveBeenCalledWith(take);
      expect(repository.query().offset).toHaveBeenCalledWith(page);
      expect(repository.query().getRawMany).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });

    it('should build a query with field', async () => {
      // Arrange
      const field: string = 'name';
      // Act
      const result = await service.find({ search, page, take, field }, extras);

      // Assert
      expect(repository.query().orderBy).toHaveBeenCalledWith(field, 'ASC');
      expect(result).toEqual(expectedData);
    });

    it('should build a query with field and order', async () => {
      // Arrange
      const field: string = 'name';
      const order: any = 'desc';
      // Act
      const result = await service.find({ search, page, take, field, order }, extras);

      // Assert
      expect(repository.query().orderBy).toHaveBeenCalledWith(field, order.toUpperCase());
      expect(result).toEqual(expectedData);
    });
  });
});
