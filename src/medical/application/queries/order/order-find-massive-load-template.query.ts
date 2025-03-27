import { QueryHandlerAsync } from "@shared/shared/application";
import { SpreadsheetCell, SpreadsheetProvider } from "@shared/shared/providers";
import { TestCreateCommandPayload } from "../../commands/test/test-create.command";
import { OrderCreateCommandPayload } from "../../commands/order/order-create.command";
import { ExamColumnProvider } from "../../providers/exam-column.provider";

export type MassiveLoadTemplate = (OrderCreateCommandPayload & Omit<TestCreateCommandPayload, 'orderId' | 'examName' | 'examSubtype' | 'examType'>);
export const spreadsheetData: MassiveLoadTemplate[] = [
    { patientDni: "12345678", branchName: "Main Clinic", corporativeName: "HealthCorp", companyRuc: "20123456789", companyName: "Wellness Healthcare", doctorDni: "87654321", doctorFullname: "Dr. John Smith", process: "Standard Checkup", year: 2025 },
    { patientDni: "23456789", branchName: "Downtown Clinic", corporativeName: "MediCare Inc.", companyRuc: "20234567890", companyName: "Advanced Diagnostics", doctorDni: "76543210", doctorFullname: "Dr. Jane Doe", process: "Routine Screening", year: 2025 },
    { patientDni: "34567890", branchName: "Northside Hospital", corporativeName: "Health Solutions", companyRuc: "20345678901", companyName: "Elite Medical", doctorDni: "65432109", doctorFullname: "Dr. Robert Brown", process: "Emergency Case", year: 2025 },
    { patientDni: "45678901", branchName: "City Health Center", corporativeName: "GlobalMed", companyRuc: "20456789012", companyName: "Prime Healthcare", doctorDni: "54321098", doctorFullname: "Dr. Emily Davis", process: "Annual Checkup", year: 2025 },
    { patientDni: "56789012", branchName: "Wellness Clinic", corporativeName: "CarePlus", companyRuc: "20567890123", companyName: "Superior Diagnostics", doctorDni: "43210987", doctorFullname: "Dr. Michael Wilson", process: "Specialized Consultation", year: 2025 },
    { patientDni: "67890123", branchName: "Suburban Medical", corporativeName: "MediGroup", companyRuc: "20678901234", companyName: "Vital Care", doctorDni: "32109876", doctorFullname: "Dr. Sarah Miller", process: "Pre-Employment Screening", year: 2025 },
    { patientDni: "78901234", branchName: "Express Labs", corporativeName: "RapidHealth", companyRuc: "20789012345", companyName: "QuickMed Diagnostics", doctorDni: "21098765", doctorFullname: "Dr. David Anderson", process: "Follow-up Test", year: 2025 },
    { patientDni: "89012345", branchName: "Eastside Medical", corporativeName: "BetterCare", companyRuc: "20890123456", companyName: "Precision Health", doctorDni: "10987654", doctorFullname: "Dr. Laura Thomas", process: "Post-Surgical Evaluation", year: 2025 },
    { patientDni: "90123456", branchName: "Premier Hospital", corporativeName: "Advanced Health", companyRuc: "20901234567", companyName: "ProCare Medical", doctorDni: "09876543", doctorFullname: "Dr. James White", process: "Chronic Condition Monitoring", year: 2025 },
    { patientDni: "01234567", branchName: "Family Health Clinic", corporativeName: "Holistic Health", companyRuc: "21012345678", companyName: "Total Wellness", doctorDni: "98765432", doctorFullname: "Dr. Olivia Harris", process: "Prenatal Screening", year: 2025 }
]

export const massiveLoadTemplateSpreadsheet: SpreadsheetCell[] = [
    { value: 'Cedula del Paciente', rowSpan: 3, font: { color: "366092", bold: true } },
    { value: 'Grupo corporativo', rowSpan: 3, font: { color: "366092", bold: true } },
    { value: 'Ruc de empresa', rowSpan: 3, font: { color: "366092", bold: true } },
    { value: 'Nombre de la empresa', rowSpan: 3, font: { color: "366092", bold: true } },
    { value: 'Sucursal', rowSpan: 3, font: { color: "366092", bold: true } },
    { value: 'Cedula del medico', rowSpan: 3, font: { color: "366092", bold: true } },
    { value: 'Nombre completo del medico', rowSpan: 3, font: { color: "366092", bold: true } },
    { value: 'Proceso', rowSpan: 3, font: { color: "366092", bold: true } },
    { value: 'Periodo', rowSpan: 3, font: { color: "366092", bold: true } },
];

export class OrderFindMassiveLoadTemplateQuery implements QueryHandlerAsync<undefined, Buffer> {
    constructor(
        private readonly spreadsheet: SpreadsheetProvider,
        private readonly provider: ExamColumnProvider
    ) { }

    async handleAsync(): Promise<Buffer> {
        const columns = await this.provider.find();

        const headerColumns = massiveLoadTemplateSpreadsheet;

        const typeColumns: SpreadsheetCell[] = columns.map(e => ({
            value: e.value,
            colSpan: e.children.map(x => x.children.length).reduce((prev, curr) => prev + curr, 0),
            font: { bold: true, color: "366092" }
        }));

        const mainHeader = [...headerColumns, ...typeColumns];

        const subtypeColumns: SpreadsheetCell[] = columns.map(e => e.children.map<SpreadsheetCell>(x => ({
            value: x.value,
            colSpan: x.children.length,
            font: { bold: true, color: "366092" }
        }))).reduce((prev, curr) => [...prev, ...curr], []);

        const examColumns: SpreadsheetCell[] = columns.map(e => e.children.map(x => x.children.map<SpreadsheetCell>(y => ({
            value: y,
            position: 'vertical',
            font: { bold: true, color: "366092", size: 8 }
        }))).reduce((prev, curr) => [...prev, ...curr], [])
        ).reduce((prev, curr) => [...prev, ...curr], []);

        const data = spreadsheetData.map<SpreadsheetCell[]>(e => [
            ...Object.values(e).map<SpreadsheetCell>(x => ({ value: x })),
            ...Array
                .from<SpreadsheetCell>({ length: 5 })
                .fill({ value: 'x' }),
            ...Array
                .from<SpreadsheetCell>({ length: examColumns.length - 5 })
                .fill({ value: '' })
        ]);

        const value = await this.spreadsheet.craft([mainHeader, subtypeColumns, examColumns, ...data]);
        return value;
    }
}