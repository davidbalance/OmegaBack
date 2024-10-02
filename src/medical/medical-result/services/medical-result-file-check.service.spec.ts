import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultFileCheckService } from "./medical-result-file-check.service";
import { TestBed } from "@automock/jest";
import { NotFoundException, StreamableFile } from "@nestjs/common";
import fs from 'fs';

jest.mock('fs');

describe('MedicalResultFileCheckService', () => {
    let service: MedicalResultFileCheckService;
    let repository: jest.Mocked<MedicalResultRepository>;
    let excelService: jest.Mocked<ExcelManagerService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultFileCheckService).compile();

        service = unit;
        repository = unitRef.get(MedicalResultRepository);
        excelService = unitRef.get(ExcelManagerService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateReport', () => {
        const mockedStream = {} as StreamableFile;
        const mockedValues = [{ id: 1, filePath: 'test', examName: 'test' }];

        it('should generate a report', async () => {
            // Arrange
            repository.query.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockReturnValue(mockedValues),
            } as any);
            excelService.craft.mockResolvedValue(mockedStream);

            // Act
            const result = await service.generateReport();

            // Assert
            expect(repository.query).toHaveBeenCalledWith('result');
            expect(repository.query().select).toHaveBeenCalledWith('result.id', 'id');
            expect(repository.query().addSelect).toHaveBeenCalledWith('result.filePath', 'filePath');
            expect(repository.query().addSelect).toHaveBeenCalledWith('result.examName', 'examName');
            expect(repository.query().where).toHaveBeenCalledWith('result.filePath IS NOT NULL');
            expect(repository.query().andWhere).toHaveBeenCalledWith('result.hasFile = 0');
            expect(repository.query().getRawMany).toHaveBeenCalled();
            expect(excelService.craft).toHaveBeenCalledWith([{ ...mockedValues[0] }], expect.any(Array), expect.any(String));
            expect(result).toEqual(mockedStream);
        });

        it('should throw not found exception', async () => {
            // Arrange
            repository.query.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockReturnValue([]),
            } as any);

            // Act & Assert
            await expect(service.generateReport()).rejects.toThrow(NotFoundException);
            expect(excelService.craft).not.toHaveBeenCalled();
        });
    });

    describe('fileCheckCount', () => {
        const mockedValues = [{ id: 1, filePath: 'test' }];

        beforeEach(() => {
            repository.query.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockedValues)
            } as any);

        });

        /*         it('should generate a report', async () => {
            // Arrange
            const spyRetriveResultFiles = jest.spyOn(service as any, 'retriveResultFiles').mockResolvedValue(mockedValues);
            const spyExistsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
            repository.findOneAndUpdate.mockResolvedValue(undefined);
            const spyRetriveMedicalResults = jest.spyOn(service as any, 'retriveMedicalResults').mockResolvedValue(mockedValues);
            excelService.craft.mockResolvedValue(mockedStream);
 
            // Act
            const result = await service.generateReport();
 
            // Assert
            expect(spyRetriveResultFiles).toHaveBeenCalled();
            expect(spyExistsSync).toHaveBeenCalledWith(mockedValues[0].filePath);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: mockedValues[0].id }, { hasFile: false });
            expect(spyRetriveMedicalResults).toHaveBeenCalled()
            expect(excelService.craft).toHaveBeenCalledWith([{ ...mockedValues[0] }], expect.any(Array), expect.any(String));
            expect(result).toEqual(mockedStream);
        }); */

        it('should retrive total, match and error counts', async () => {
            // Arrange
            const spyExistsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
            repository.findOneAndUpdate.mockResolvedValue(undefined);

            // Act
            const result = await service.fileCheckCount();

            // Assert
            expect(spyExistsSync).toHaveBeenCalledWith(mockedValues[0].filePath);
            expect(repository.query).toHaveBeenCalledWith('result');
            expect(repository.query().select).toHaveBeenCalledWith('result.id', 'id');
            expect(repository.query().addSelect).toHaveBeenCalledWith('result.filePath', 'filePath');
            expect(repository.query().where).toHaveBeenCalledWith('result.filePath IS NOT NULL');
            expect(repository.query().andWhere).toHaveBeenCalledWith('result.hasFile = 1');
            expect(repository.query().getRawMany).toHaveBeenCalled();
        });
    });
});