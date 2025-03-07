import { QueryHandlerAsync } from "@shared/shared/application";
import { TestFileResultRepository } from "../../repository/model.repositories";
import { TestFileResultModel } from "@prisma/client";
import { SpreadsheetColumn, SpreadsheetProvider } from "@shared/shared/providers";

export const reportSpreadsheet: SpreadsheetColumn<TestFileResultModel>[] = [
    { header: 'ID', key: 'testId' },
    { header: 'NOMBRE', key: 'patientName' },
    { header: 'APELLIDO', key: 'patientLastname' },
    { header: 'CEDULA', key: 'patientDni' },
    { header: 'EXAMEN', key: 'examName' },
    { header: 'UBICACION DEL ARCHIVO', key: 'resultFilepath' },
]

export class TestFileResultReportQuery implements QueryHandlerAsync<undefined, Buffer> {
    constructor(
        private readonly repository: TestFileResultRepository,
        private readonly spreadsheet: SpreadsheetProvider<TestFileResultModel>
    ) { }

    async handleAsync(): Promise<Buffer> {
        const values = await this.repository.findManyAsync({ filter: [{ field: 'resultHasFile', operator: 'eq', value: false }] });

        const buffer = await this.spreadsheet.craft(values, reportSpreadsheet);
        return buffer;
    }
}