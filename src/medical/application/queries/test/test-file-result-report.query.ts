import { QueryHandlerAsync } from "@shared/shared/application";
import { TestFileResultRepository } from "../../repository/model.repositories";
import { TestFileResultModel } from "@prisma/client";
import { SpreadsheetCell, SpreadsheetProvider, SpreadsheetWorkbook } from "@shared/shared/providers";

export const reportSpreadsheet: SpreadsheetCell[] = [
    { value: 'ID', font: { bold: true } },
    { value: 'NOMBRE', font: { bold: true } },
    { value: 'APELLIDO', font: { bold: true } },
    { value: 'CEDULA', font: { bold: true } },
    { value: 'EXAMEN', font: { bold: true } },
    { value: 'UBICACION DEL ARCHIVO', font: { bold: true } },
];

const ordering: { key: keyof TestFileResultModel }[] = [
    { key: 'testId' },
    { key: 'patientName' },
    { key: 'patientLastname' },
    { key: 'patientDni' },
    { key: 'examName' },
    { key: 'resultFilepath' },
]

export class TestFileResultReportQuery implements QueryHandlerAsync<undefined, Buffer> {
    constructor(
        private readonly repository: TestFileResultRepository,
        private readonly spreadsheet: SpreadsheetProvider
    ) { }

    async handleAsync(): Promise<Buffer> {
        const values = await this.repository.findManyAsync({ filter: [{ field: 'resultHasFile', operator: 'eq', value: false }] });

        const data: SpreadsheetWorkbook = values.map(e => ordering.map<SpreadsheetCell>(x => ({
            value: e[x.key as any] ?? ''
        })))

        const buffer = await this.spreadsheet.craft([reportSpreadsheet, ...data]);
        return buffer;
    }
}