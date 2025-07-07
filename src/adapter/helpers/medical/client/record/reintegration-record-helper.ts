import { craftCurrentDisease, craftDiagnosticHeader, CraftItemFunc, craftMedicalConsultation, craftMedicalDiagnostic, craftMedicalFitnessForJob, craftPhysicalRegionalExam, craftRecommendation, CraftRecordFunc, craftSpecificAndGeneralResults, craftVitalSignsAndAnthropometry, flatRecord } from "../generic-record-helper";
import { ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record";
import { craftCell, craftHeader, craftRow, craftSpacing, craftTitle } from "../table.helper";
import { formatDate } from "date-fns";

export const createReintegrationRecord: CraftRecordFunc<ReintegrateRecord> = (record: ReintegrateRecord, { fileNumber, }) => flatRecord([
    craftHeader('A. Datos del Establecimiento - Empresa y Usuario'),
    institutionLayout({ ...record, fileNumber }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('B. Motivo de Consulta'),
    craftMedicalConsultation(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('C. Enfermedad Actual'),
    craftCurrentDisease(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('D. Constantes Vitales y Antropometría'),
    craftVitalSignsAndAnthropometry(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('E. Examen Físico Regional'),
    craftPhysicalRegionalExam(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('F. Resultados de Exámenes (imagen, laboratorio y otros)'),
    craftSpecificAndGeneralResults(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftDiagnosticHeader("G. Diagnóstico"),
    craftMedicalDiagnostic(record.diagnostics),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('H. Aptitud Médica para el Trabajo'),
    craftMedicalFitnessForJob(record, { showReubication: true }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('I. Recomendaciones y/o Tratamiento'),
    craftRecommendation(record)
]);

const institutionLayout: CraftItemFunc<ReintegrateRecord & {
    fileNumber: number;
}> = (record) => [
    craftRow(
        craftTitle('Institución del Sistema o Nombre de la Empresa', { colSpan: 16 }),
        craftTitle('RUC', { colSpan: 10 }),
        craftTitle('CIIU', { colSpan: 5 }),
        craftTitle('Establecimiento de Salud', { colSpan: 15 }),
        craftTitle('Número de Historia Clínica', { colSpan: 14 }),
        craftTitle('Número de Archivo', { colSpan: 10 }),
    ),
    craftRow(
        craftCell(record.companyName, { colSpan: 16 }),
        craftCell(record.companyRUC, { colSpan: 10 }),
        craftCell(record.companyCIIU ?? '', { colSpan: 5 }),
        craftCell(record.institutionHealthFacility, { colSpan: 15 }),
        craftCell(record.patientDni, { colSpan: 14 }),
        craftCell(record.fileNumber.toString().padStart(12, '0'), { colSpan: 10 }),
    ),
    craftRow(
        craftTitle('Primer apellido', { colSpan: 6 }),
        craftTitle('Segundo apellido', { colSpan: 6 }),
        craftTitle('Primer nombre', { colSpan: 6 }),
        craftTitle('Segundo nombre', { colSpan: 6 }),
        craftTitle('Sexo', { colSpan: 5 }),
        craftTitle('EDAD', { colSpan: 5 }),
        craftTitle('Puesto de trabajo (CIUO)', { colSpan: 6 }),
        craftTitle('Fecha del último día laboral', { colSpan: 6 }),
        craftTitle('Fecha de reingreso', { colSpan: 6 }),
        craftTitle('Total (días)', { colSpan: 6 }),
        craftTitle('Causa de salida', { colSpan: 12 }),
    ),
    craftRow(
        craftCell(record.patientLastName, { colSpan: 6 }),
        craftCell(record.patientSecondLastName, { colSpan: 6 }),
        craftCell(record.patientFirstName, { colSpan: 6 }),
        craftCell(record.patientMiddleName, { colSpan: 6 }),
        craftCell(record.patientGender === 'male' ? 'H' : 'M', { colSpan: 5, fontSize: 5 }),
        craftCell(record.patientAge.toString(), { colSpan: 5 }),
        craftCell(record.jobPosition, { colSpan: 6 }),
        craftCell(formatDate(record.workingEndDate, 'yyyy/MM/dd'), { colSpan: 6 }),
        craftCell(formatDate(record.workingReintegrationDate, 'yyyy/MM/dd'), { colSpan: 6 }),
        craftCell(record.workingTime.toString(), { colSpan: 6 }),
        craftCell(record.workingLeftCause.toString(), { colSpan: 12 }),
    ),
]