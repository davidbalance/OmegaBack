import { ModelRepository } from "@shared/shared/providers/model.repository";
import { TestReportModel } from "@omega/medical/core/model/test/test-report.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter } from "@shared/shared/domain";
import { SpreadsheetCell, SpreadsheetProvider, SpreadsheetWorkbook } from "@shared/shared/providers";

export const testReportSpreadsheet: SpreadsheetCell[] = [
    { value: 'Empresa', font: { bold: true, color: '366092' } },
    { value: 'Sucursal', font: { bold: true, color: '366092' } },
    { value: 'Gerencia', font: { bold: true, color: '366092' } },
    { value: 'Area', font: { bold: true, color: '366092' } },
    { value: 'Año', font: { bold: true, color: '366092' } },
    { value: 'Proceso', font: { bold: true, color: '366092' } },
    { value: 'Fecha', font: { bold: true, color: '366092' } },
    { value: 'Puesto de Trabajo', font: { bold: true, color: '366092' } },
    { value: 'Rol', font: { bold: true, color: '366092' } },
    { value: 'Cedula', font: { bold: true, color: '366092' } },
    { value: 'Nombre', font: { bold: true, color: '366092' } },
    { value: 'Apellido', font: { bold: true, color: '366092' } },
    { value: 'Email', font: { bold: true, color: '366092' } },
    { value: 'Cumpleaños', font: { bold: true, color: '366092' } },
    { value: 'Edad', font: { bold: true, color: '366092' } },
    { value: 'Rango de edad', font: { bold: true, color: '366092' } },
    { value: 'Sexo', font: { bold: true, color: '366092' } },
    { value: 'T. Prueba', font: { bold: true, color: '366092' } },
    { value: 'S.T. Prueba', font: { bold: true, color: '366092' } },
    { value: 'Prueba', font: { bold: true, color: '366092' } },
    { value: 'Grupo Morbilidad', font: { bold: true, color: '366092' } },
    { value: 'Morbilidad', font: { bold: true, color: '366092' } },
    { value: 'Observacion', font: { bold: true, color: '366092' } },
    { value: 'Hallazgos de Morbilidad', font: { bold: true, color: '366092' } },
]

const cellOrdering: { key: keyof TestReportModel }[] = [{ key: 'locationCompany' }, { key: 'locationBranch' }, { key: 'locationManagement' }, { key: 'locationArea' }, { key: 'orderYear' }, { key: 'orderProcess' }, { key: 'orderDate' }, { key: 'locationJobPosition' }, { key: 'patientRole' }, { key: 'patientDni' }, { key: 'patientName' }, { key: 'patientLastname' }, { key: 'patientEmail' }, { key: 'patientBirthday' }, { key: 'patientAge' }, { key: 'patientAge' }, { key: 'patientGender' }, { key: 'examType' }, { key: 'examSubtype' }, { key: 'examName' }, { key: 'diseaseGroup' }, { key: 'diseaseName' }, { key: 'diseaseCommentary' }, { key: 'diseaseFindings' },]

export type TestReportGetFileQueryPayload = {
    orderYear?: number;
    locationCorporative?: string;
    locationCompany?: string;
}
export interface TestReportGetFileQuery extends QueryHandlerAsync<TestReportGetFileQueryPayload, Buffer> { }

export class TestReportGetFileQueryImpl implements TestReportGetFileQuery {
    constructor(
        private readonly repository: ModelRepository<TestReportModel>,
        private readonly spreadsheet: SpreadsheetProvider
    ) { }

    async handleAsync(query: TestReportGetFileQueryPayload): Promise<Buffer> {
        const filter = Object.entries(query)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => !!value)
            .map<Filter<TestReportModel>>(([key, value]): Filter<TestReportModel> => ({
                field: key as keyof TestReportModel,
                operator: 'eq',
                value: value
            }));


        const values = await this.repository.findManyAsync({ filter: filter });

        const cells: SpreadsheetWorkbook = values.map(e => cellOrdering.map<SpreadsheetCell>(x => ({
            value: e[x.key as any] ?? ''
        })))

        const buffer = await this.spreadsheet.craft([testReportSpreadsheet, ...cells]);
        return buffer;
    }
}