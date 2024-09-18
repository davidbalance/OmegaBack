import { TestBed } from "@automock/jest";
import { PatientRepository } from "../repositories/patient.repository";
import { PatientPaginationService } from "./patient-pagination.service";
import { mockPatients } from "../stub/patient.stub";

describe('PatientPaginationService', () => {
  let service: PatientPaginationService;
  let repository: jest.Mocked<PatientRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PatientPaginationService).compile();

    service = unit;
    repository = unitRef.get(PatientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = 1;

    const mockedArea = mockPatients();
    const expectedData = mockedArea;

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedArea)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.find({ search, page, take }, extras);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('patient');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('patient.user', 'user', 'user.status = :status', { status: true });
      expect(repository.query().select).toHaveBeenCalledWith('user.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'user.lastname', 'lastname');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'user.email', 'email');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(3, 'user.dni', 'dni');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(4, 'user.id', 'user');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(5, 'patient.birthday', 'birthday');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(6, 'patient.gender', 'gender');
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
