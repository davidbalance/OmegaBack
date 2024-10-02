import { Inject, Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import dayjs from "dayjs";
import { existsSync } from "fs";
import { In } from "typeorm";

@Injectable()
export class MedicalResultFileCheckService {

    private readonly columns: {
        header: string, key: 'id' | 'filePath' | 'examName'
    }[] = [
            { header: "ID", key: "id" },
            { header: "EXAMEN", key: "examName" },
            { header: "UBICACION DEL ARCHIVO", key: "filePath" }
        ];

    constructor(
        @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
        @Inject(ExcelManagerService) private excelService: ExcelManagerService,
    ) { }

    public async generateReport(): Promise<StreamableFile> {
        const values = await this.repository.query('result')
            .select('result.id', 'id')
            .addSelect('result.filePath', 'filePath')
            .addSelect('result.examName', 'examName')
            .where('result.filePath IS NOT NULL')
            .andWhere('result.hasFile = 0')
            .getRawMany<{ id: number, filePath: string, examName: string }>();

        if (!values.length) {
            throw new NotFoundException();
        }

        const stream = await this.excelService.craft(values, this.columns as any, `archivos_no_encontrados-${dayjs().format('YYYYMM')}`);
        return stream;
    }

    public async fileCheckCount(): Promise<{ total: number, match: number, error: number, }> {
        const files = await this.repository.query('result')
            .select('result.id', 'id')
            .addSelect('result.filePath', 'filePath')
            .where('result.filePath IS NOT NULL')
            .andWhere('result.hasFile = 1')
            .getRawMany<{ id: number, filePath: string }>();

        const batchSize = 1000;
        const ids: number[] = [];

        for (let i = 0; i < files.length; i += batchSize) {
            const batch = files.slice(i, i + batchSize);
            const batchedIds = await Promise.all(batch.filter((value) => !existsSync(value.filePath)).map(e => e.id));
            ids.push(...batchedIds);
        }

        await this.repository.updateInIds(ids, { hasFile: false });
        return {
            total: files.length,
            match: files.length - ids.length,
            error: ids.length
        }
    }
}
