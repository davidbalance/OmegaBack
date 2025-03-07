import { ModelRepository } from "@shared/shared/providers/model.repository";
import { TestReportModel } from "@omega/medical/core/model/test/test-report.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter } from "@shared/shared/domain";
import { SpreadsheetColumn, SpreadsheetProvider } from "@shared/shared/providers";

export const testReportSpreadsheet: SpreadsheetColumn<TestReportModel>[] = [
    { header: 'Empresa', key: 'locationCompany' },
    { header: 'Sucursal', key: 'locationBranch' },
    { header: 'Gerencia', key: 'locationManagement' },
    { header: 'Area', key: 'locationArea' },
    { header: 'Año', key: 'orderYear' },
    { header: 'Proceso', key: 'orderProcess' },
    { header: 'Fecha', key: 'orderDate' },
    { header: 'Puesto de Trabajo', key: 'locationJobPosition' },
    { header: 'Rol', key: 'patientRole' },
    { header: 'Cedula', key: 'patientDni' },
    { header: 'Nombre', key: 'patientName' },
    { header: 'Apellido', key: 'patientLastname' },
    { header: 'Email', key: 'patientEmail' },
    { header: 'Cumpleaños', key: 'patientBirthday' },
    { header: 'Edad', key: 'patientAge' },
    { header: 'Rango de edad', key: 'patientAge' },
    { header: 'Sexo', key: 'patientGender' },
    { header: 'T. Prueba', key: 'examType' },
    { header: 'S.T. Prueba', key: 'examSubtype' },
    { header: 'Prueba', key: 'examName' },
    { header: 'Grupo Morbilidad', key: 'diseaseGroup' },
    { header: 'Morbilidad', key: 'diseaseName' },
    { header: 'Observacion', key: 'diseaseCommentary' },
    { header: 'Hallazgos de Morbilidad', key: 'diseaseFindings' },
]

export type TestReportGetFileQueryPayload = {
    orderYear?: number;
    locationCorporative?: string;
    locationCompany?: string;
}
export class TestReportGetFileQuery implements QueryHandlerAsync<TestReportGetFileQueryPayload, Buffer> {
    constructor(
        private readonly repository: ModelRepository<TestReportModel>,
        private readonly spreadsheet: SpreadsheetProvider<TestReportModel>
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

        const buffer = await this.spreadsheet.craft(values, testReportSpreadsheet);
        return buffer;
    }
}