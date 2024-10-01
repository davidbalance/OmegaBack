import { Inject, Injectable, Logger, NotFoundException, StreamableFile } from "@nestjs/common";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import dayjs from "dayjs";

@Injectable()
export class MedicalResultFileCheckService {

    private readonly columns: {
        header: string, key: 'id' | 'hasFile' | 'filePath' | 'examName'
    }[] = [
            { header: "ID", key: "id" },
            { header: "EXAMEN", key: "examName" },
            { header: "UBICACION DEL ARCHIVO", key: "filePath" },
            { header: "POSEE ARCHIVO", key: "hasFile" }
        ];

    constructor(
        @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
        @Inject(ExcelManagerService) private excelService: ExcelManagerService,
        @Inject(MedicalResultFileManagementService) private readonly fileService: MedicalResultFileManagementService,
    ) { }

    public async generateReport(): Promise<StreamableFile> {
        const values = await this.retriveMedicalResults();
        const processedValues: any[] = [];

        for (const value of values) {
            try {
                await this.fileService.getFile(value.id);
            } catch (error) {
                Logger.error(error);
                processedValues.push({ ...value, hasFile: value.hasFile ? 'SI' : 'NO' });
            }
        }

        if (!processedValues.length) {
            throw new NotFoundException();
        }

        const stream = await this.excelService.craft(processedValues, this.columns as any, `archivos_no_encontrados-${dayjs().format('YYYYMM')}`);
        return stream;
    }

    private retriveMedicalResults() {
        return this.repository.query('result')
            .select('result.id', 'id')
            .addSelect('result.hasFile', 'hasFile')
            .addSelect('result.filePath', 'filePath')
            .addSelect('result.examName', 'examName')
            .where('result.filePath IS NOT NULL')
            .andWhere('result.hasFile = 1')
            .getRawMany<{ id: number, hasFile: boolean, filePath: string, examName: string }>();
    }
}
