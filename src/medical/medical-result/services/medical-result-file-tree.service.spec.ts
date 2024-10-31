import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { TestBed } from "@automock/jest";
import { ZipperService } from "@/shared/zipper/zipper.service";
import { StreamableFile } from "@nestjs/common";
import { MedicalResultFileTreeService } from "./medical-result-file-tree.service";

describe('MedicalResultFileTreeService', () => {
  let service: MedicalResultFileTreeService;
  let repository: jest.Mocked<MedicalResultRepository>;
  let zipper: jest.Mocked<ZipperService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultFileTreeService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultRepository);
    zipper = unitRef.get(ZipperService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTree', () => {

    const mockedTree: { filePath: string, examName: string, order: string, corporativeName: string, companyName: string, companyRuc: string, branchName: string, process: string, year: string, dni: string, name: string, lastname: string }[] = [
      {
        filePath: "path/to/file",
        examName: "test exam",
        order: "00000001",
        corporativeName: "Test corporative group",
        companyName: "Test company",
        companyRuc: "9999999999001",
        branchName: "Test branch",
        process: "Pre-Ocupacional",
        year: "20XX",
        dni: "17XXXXXXX",
        name: "Test",
        lastname: "Test"
      }
    ];
    const mockedZip = {} as StreamableFile;
    const expectedValue = mockedZip;

    const data = {
      year: '20XX',
      corporativeName: 'Test Corporative Group',
      company: '9999999999001',
      branch: 'Test Branch',
      process: 'Post-Ocupacional',
      patient: '17XXXXXXXX'
    };

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedTree)
      } as any);
      zipper.zip.mockResolvedValue(mockedZip);
    });

    it('should retrive streamable file without checking skiping param values', async () => {
      // Arrange
      // Act
      const result = await service.getTree({});

      // Assert
      expect(repository.query).toHaveBeenCalledWith('result');
      expect(repository.query().leftJoinAndSelect).toHaveBeenNthCalledWith(1, 'result.order', 'order');
      expect(repository.query().leftJoinAndSelect).toHaveBeenNthCalledWith(2, 'order.client', 'client');
      expect(repository.query().select).toHaveBeenCalledWith('result.filePath', 'filePath');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'result.examName', 'examName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'LPAD(order.id, 9, "0")', 'order');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(3, 'order.corporativeName', 'corporativeName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(4, 'order.companyName', 'companyName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(5, 'order.companyRuc', 'companyRuc');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(6, 'order.branchName', 'branchName');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(7, 'order.process', 'process');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(8, 'YEAR(order.createAt)', 'year');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(9, 'client.dni', 'dni');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(10, 'client.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(11, 'client.lastname', 'lastname');
      expect(repository.query().where).toHaveBeenCalledWith('result.hasFile = 1');
      expect(repository.query().andWhere).toHaveBeenNthCalledWith(1, 'result.filePath IS NOT NULL');
      expect(repository.query().andWhere).not.toHaveBeenNthCalledWith(2, 'YEAR(order.createAt) = :year', { year: data.year });
      expect(repository.query().andWhere).not.toHaveBeenNthCalledWith(3, 'order.corporativeName LIKE :corporativeName', { corporativeName: data.corporativeName });
      expect(repository.query().andWhere).not.toHaveBeenNthCalledWith(4, 'order.companyRuc = :company', { company: data.company });
      expect(repository.query().andWhere).not.toHaveBeenNthCalledWith(5, 'order.branchName LIKE :branch', { branch: data.branch });
      expect(repository.query().andWhere).not.toHaveBeenNthCalledWith(6, 'order.process LIKE :process', { process: data.process });
      expect(repository.query().andWhere).not.toHaveBeenNthCalledWith(7, 'client.dni LIKE :dni', { dni: data.patient });
      expect(result).toEqual(expectedValue);
    });

    it('should retrive streamable file checking year', async () => {
      // Arrange
      // Act
      const result = await service.getTree({ year: data.year });

      // Assert
      expect(repository.query().andWhere).toHaveBeenNthCalledWith(2, 'YEAR(order.createAt) = :year', { year: data.year });
      expect(result).toEqual(expectedValue);
    });

    it('should retrive streamable file checking corporativeName', async () => {
      // Arrange
      // Act
      const result = await service.getTree({ corporativeName: data.corporativeName });

      // Assert
      expect(repository.query().andWhere).toHaveBeenNthCalledWith(2, 'order.corporativeName LIKE :corporativeName', { corporativeName: data.corporativeName });
      expect(result).toEqual(expectedValue);
    });

    it('should retrive streamable file checking company', async () => {
      // Arrange
      // Act
      const result = await service.getTree({ company: data.company });

      // Assert
      expect(repository.query().andWhere).toHaveBeenNthCalledWith(2, 'order.companyRuc = :company', { company: data.company });
      expect(result).toEqual(expectedValue);
    });

    it('should retrive streamable file checking branch', async () => {
      // Arrange
      // Act
      const result = await service.getTree({ branch: data.branch });

      // Assert
      expect(repository.query().andWhere).toHaveBeenNthCalledWith(2, 'order.branchName LIKE :branch', { branch: data.branch });
      expect(result).toEqual(expectedValue);
    });

    it('should retrive streamable file checking process', async () => {
      // Arrange
      // Act
      const result = await service.getTree({ process: data.process });

      // Assert
      expect(repository.query().andWhere).toHaveBeenNthCalledWith(2, 'order.process LIKE :process', { process: data.process });
      expect(result).toEqual(expectedValue);
    });
    
    it('should retrive streamable file checking patient', async () => {
      // Arrange
      // Act
      const result = await service.getTree({ patient: data.patient });

      // Assert
      expect(repository.query().andWhere).toHaveBeenNthCalledWith(2, 'client.dni LIKE :dni', { dni: data.patient });
      expect(result).toEqual(expectedValue);
    });
  });
});