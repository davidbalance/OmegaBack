import { Inject, Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import dayjs from "dayjs";
import { existsSync } from "fs";

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
        const files = await this.retriveResultFiles();
        const batchSize = 1000;  // Define a reasonable batch size

        for (let i = 0; i < files.length; i += batchSize) {
            const batch = files.slice(i, i + batchSize);
            await Promise.all(batch.map(async (value) => {
                if (!existsSync(value.filePath)) {
                    await this.repository.findOneAndUpdate({ id: value.id }, { hasFile: false });
                }
            }));
        }

        const values = await this.retriveMedicalResults();
        console.log(values);

        if (!values.length) {
            throw new NotFoundException();
        }

        const stream = await this.excelService.craft(values, this.columns as any, `archivos_no_encontrados-${dayjs().format('YYYYMM')}`);
        return stream;
    }

    private retriveResultFiles() {
        return this.repository.query('result')
            .select('result.id', 'id')
            .addSelect('result.filePath', 'filePath')
            .where('result.filePath IS NOT NULL')
            .andWhere('result.hasFile = 1')
            .getRawMany<{ id: number, filePath: string }>();
    }

    private retriveMedicalResults() {
        return this.repository.query('result')
            .select('result.id', 'id')
            .addSelect('result.filePath', 'filePath')
            .addSelect('result.examName', 'examName')
            .where('result.filePath IS NOT NULL')
            .andWhere('result.hasFile = 0')
            .getRawMany<{ id: number, filePath: string, examName: string }>();
    }
}
