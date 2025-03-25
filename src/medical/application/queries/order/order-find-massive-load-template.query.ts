import { QueryHandlerAsync } from "@shared/shared/application";
import { SpreadsheetColumn, SpreadsheetProvider } from "@shared/shared/providers";
import { TestCreateCommandPayload } from "../../commands/test/test-create.command";
import { OrderCreateCommandPayload } from "../../commands/order/order-create.command";

export type MassiveLoadTemplate = (OrderCreateCommandPayload & Omit<TestCreateCommandPayload, 'orderId'>);
export const spreadsheetData: MassiveLoadTemplate[] = [
    { patientDni: "12345678", branchName: "Main Clinic", corporativeName: "HealthCorp", companyRuc: "20123456789", companyName: "Wellness Healthcare", doctorDni: "87654321", doctorFullname: "Dr. John Smith", process: "Standard Checkup", year: 2025, examName: "Blood Test", examSubtype: "Complete Blood Count", examType: "Laboratory" },
    { patientDni: "23456789", branchName: "Downtown Clinic", corporativeName: "MediCare Inc.", companyRuc: "20234567890", companyName: "Advanced Diagnostics", doctorDni: "76543210", doctorFullname: "Dr. Jane Doe", process: "Routine Screening", year: 2025, examName: "X-Ray", examSubtype: "Chest X-Ray", examType: "Radiology" },
    { patientDni: "34567890", branchName: "Northside Hospital", corporativeName: "Health Solutions", companyRuc: "20345678901", companyName: "Elite Medical", doctorDni: "65432109", doctorFullname: "Dr. Robert Brown", process: "Emergency Case", year: 2025, examName: "MRI", examSubtype: "Brain MRI", examType: "Radiology" },
    { patientDni: "45678901", branchName: "City Health Center", corporativeName: "GlobalMed", companyRuc: "20456789012", companyName: "Prime Healthcare", doctorDni: "54321098", doctorFullname: "Dr. Emily Davis", process: "Annual Checkup", year: 2025, examName: "Ultrasound", examSubtype: "Abdominal Ultrasound", examType: "Imaging" },
    { patientDni: "56789012", branchName: "Wellness Clinic", corporativeName: "CarePlus", companyRuc: "20567890123", companyName: "Superior Diagnostics", doctorDni: "43210987", doctorFullname: "Dr. Michael Wilson", process: "Specialized Consultation", year: 2025, examName: "Electrocardiogram", examSubtype: "ECG", examType: "Cardiology" },
    { patientDni: "67890123", branchName: "Suburban Medical", corporativeName: "MediGroup", companyRuc: "20678901234", companyName: "Vital Care", doctorDni: "32109876", doctorFullname: "Dr. Sarah Miller", process: "Pre-Employment Screening", year: 2025, examName: "Urine Test", examSubtype: "Drug Screening", examType: "Toxicology" },
    { patientDni: "78901234", branchName: "Express Labs", corporativeName: "RapidHealth", companyRuc: "20789012345", companyName: "QuickMed Diagnostics", doctorDni: "21098765", doctorFullname: "Dr. David Anderson", process: "Follow-up Test", year: 2025, examName: "CT Scan", examSubtype: "Full Body Scan", examType: "Radiology" },
    { patientDni: "89012345", branchName: "Eastside Medical", corporativeName: "BetterCare", companyRuc: "20890123456", companyName: "Precision Health", doctorDni: "10987654", doctorFullname: "Dr. Laura Thomas", process: "Post-Surgical Evaluation", year: 2025, examName: "Biopsy", examSubtype: "Skin Biopsy", examType: "Pathology" },
    { patientDni: "90123456", branchName: "Premier Hospital", corporativeName: "Advanced Health", companyRuc: "20901234567", companyName: "ProCare Medical", doctorDni: "09876543", doctorFullname: "Dr. James White", process: "Chronic Condition Monitoring", year: 2025, examName: "Blood Sugar Test", examSubtype: "HbA1c", examType: "Endocrinology" },
    { patientDni: "01234567", branchName: "Family Health Clinic", corporativeName: "Holistic Health", companyRuc: "21012345678", companyName: "Total Wellness", doctorDni: "98765432", doctorFullname: "Dr. Olivia Harris", process: "Prenatal Screening", year: 2025, examName: "Genetic Test", examSubtype: "Carrier Screening", examType: "Genetics" }
]
export const massiveLoadTemplateSpreadsheet: SpreadsheetColumn<MassiveLoadTemplate>[] = [
    { header: 'Cedula del Paciente', key: 'patientDni' },
    { header: 'Grupo corporativo', key: 'corporativeName' },
    { header: 'Ruc de empresa', key: 'companyRuc' },
    { header: 'Nombre de la empresa', key: 'companyName' },
    { header: 'Sucursal', key: 'branchName' },
    { header: 'Cedula del medico', key: 'doctorDni' },
    { header: 'Nombre completo del medico', key: 'doctorFullname' },
    { header: 'Proceso', key: 'process' },
    { header: 'Periodo', key: 'year' },
    { header: 'Tipo de Prueba', key: 'examType' },
    { header: 'Subtipo de Prueba', key: 'examSubtype' },
    { header: 'Prueba', key: 'examName' },
]
export class OrderFindMassiveLoadTemplateQuery implements QueryHandlerAsync<undefined, Buffer> {
    constructor(
        private readonly spreadsheet: SpreadsheetProvider<MassiveLoadTemplate>
    ) { }

    async handleAsync(): Promise<Buffer> {
        const value = await this.spreadsheet.craft(spreadsheetData, massiveLoadTemplateSpreadsheet);
        return value;
    }
}