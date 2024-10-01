import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultFileCheckService } from "./medical-result-file-check.service";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { TestBed } from "@automock/jest";
import { NotFoundException, StreamableFile } from "@nestjs/common";

describe('MedicalResultFileCheckService', () => {
    let service: MedicalResultFileCheckService;
    let repository: jest.Mocked<MedicalResultRepository>;
    let excelService: jest.Mocked<ExcelManagerService>;
    let fileService: jest.Mocked<MedicalResultFileManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultFileCheckService).compile();

        service = unit;
        repository = unitRef.get(MedicalResultRepository);
        excelService = unitRef.get(ExcelManagerService);
        fileService = unitRef.get(MedicalResultFileManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateReport', () => {
        const mockedStream = {} as StreamableFile;
        const mockedValues = [{ id: 1, hasFile: true, filePath: 'test', examName: 'test' }];

        it('should generate a report', async () => {
            // Arrange
            const spy = jest.spyOn(service as any, 'retriveMedicalResults').mockResolvedValue(mockedValues);
            fileService.getFile.mockRejectedValue(new NotFoundException());
            excelService.craft.mockResolvedValue(mockedStream);

            // Act
            const result = await service.generateReport();

            // Assert
            expect(spy).toHaveBeenCalledTimes(1);
            expect(fileService.getFile).toHaveBeenCalledWith(mockedValues[0].id);
            expect(excelService.craft).toHaveBeenCalledWith([{ ...mockedValues[0], hasFile: 'SI' }], expect.any(Array), expect.any(String));
            expect(result).toEqual(mockedStream);
        });

        it('should throw not found exception', async () => {
            // Arrange
            const spy = jest.spyOn(service as any, 'retriveMedicalResults').mockResolvedValue(mockedValues);
            fileService.getFile.mockResolvedValue({} as any);
            excelService.craft.mockRejectedValue({});

            // Act & Assert
            await expect(service.generateReport()).rejects.toThrow(NotFoundException);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(fileService.getFile).toHaveBeenCalledWith(mockedValues[0].id);
        });
    });

    describe('retriveMedicalResults', () => {
        const mockedValues = [{ id: 1, hasFile: true, filePath: 'test', examName: 'test' }];

        beforeEach(() => {
            repository.query.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockedValues)
            } as any);

        });

        it('should retrive data', async () => {
            // Arrange
            // Act
            const result = await (service as any).retriveMedicalResults();

            // Assert
            expect(repository.query).toHaveBeenCalledWith('result');
            expect(repository.query().select).toHaveBeenCalledWith('result.id', 'id');
            expect(repository.query().addSelect).toHaveBeenCalledWith('result.hasFile', 'hasFile');
            expect(repository.query().addSelect).toHaveBeenCalledWith('result.filePath', 'filePath');
            expect(repository.query().addSelect).toHaveBeenCalledWith('result.examName', 'examName');
            expect(repository.query().addSelect).toHaveBeenCalledWith('result.examName', 'examName');
            expect(repository.query().where).toHaveBeenCalledWith('result.filePath IS NOT NULL');
            expect(repository.query().andWhere).toHaveBeenCalledWith('result.hasFile = 1');
            expect(repository.query().getRawMany).toHaveBeenCalled();
            expect(result).toEqual(mockedValues);
        });
    });
});