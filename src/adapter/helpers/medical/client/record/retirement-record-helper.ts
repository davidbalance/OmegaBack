import { RetirementRecord } from "@omega/medical/application/type/retirement-record";
import { craftDiagnosticHeader, CraftItemFunc, craftJobAccident, craftLabel, craftMedicalAndSurgicalHistory, craftMedicalDiagnostic, craftOccupationalDisease, craftPhysicalRegionalExam, craftRecommendation, CraftRecordFunc, craftSpecificAndGeneralResults, craftVitalSignsAndAnthropometry, flatRecord } from "../generic-record-helper";
import { craftCell, craftHeader, craftRow, craftSpacing, craftTitle, emptyCell, Row } from "../table.helper";
import { formatDate } from "date-fns";

export const createRetirementRecord: CraftRecordFunc<RetirementRecord> = (record: RetirementRecord, { fileNumber, }) => flatRecord([
    craftHeader('Datos del Establecimiento - Empresa y Usuario'),
    institutionLayout({ ...record, fileNumber }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Antecedentes Personales'),
    craftMedicalAndSurgicalHistory(record),
    craftJobAccident(record),
    craftOccupationalDisease(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Constantes Vitales y Antropometría'),
    craftVitalSignsAndAnthropometry(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Examen Físico Regional'),
    craftPhysicalRegionalExam(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Resultados de Exámenes Generales y Específicos de Acuerdo al Riesgo y Puesto de Trabajo (imagen, laboratorio y otros)'),
    craftSpecificAndGeneralResults(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftDiagnosticHeader(),
    craftMedicalDiagnostic(record.diagnostics),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Evaluación Médica de Retiro'),
    medicalRetirementEvaluation(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Recomendaciones y/o Tratamiento'),
    craftRecommendation(record)
]);

const institutionLayout: CraftItemFunc<RetirementRecord & {
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
        craftTitle('Primer apellido', { colSpan: 8 }),
        craftTitle('Segundo apellido', { colSpan: 8 }),
        craftTitle('Primer nombre', { colSpan: 8 }),
        craftTitle('Segundo nombre', { colSpan: 8 }),
        craftTitle('Sexo', { colSpan: 6 }),
        craftTitle('Fecha de inicio de labores', { colSpan: 8 }),
        craftTitle('Fecha de salida', { colSpan: 8 }),
        craftTitle('Tiempo (meses)', { colSpan: 8 }),
        craftTitle('Puesto de trabajo (CIUO)', { colSpan: 8 }),
    ),
    craftRow(
        craftCell(record.patientLastName, { colSpan: 8 }),
        craftCell(record.patientSecondLastName, { colSpan: 8 }),
        craftCell(record.patientFirstName, { colSpan: 8 }),
        craftCell(record.patientMiddleName, { colSpan: 8 }),
        craftCell(record.patientGender === 'male' ? 'H' : 'M', { colSpan: 6, fontSize: 5 }),
        craftCell(formatDate(record.workStartDate, 'yyyy/MM/dd'), { colSpan: 8 }),
        craftCell(formatDate(record.workingEndDate, 'yyyy/MM/dd'), { colSpan: 8 }),
        craftCell(record.workingTime.toString(), { colSpan: 8 }),
        craftCell(record.jobPosition, { colSpan: 8 }),
    ),
    craftRow(
        craftTitle('Actividades', { colSpan: 15 }),
        craftTitle('Factores de riesgo', { colSpan: 55 }),
    ),
    ...record.institutionActivities.map(e => craftRow(
        craftCell(e.activity, { colSpan: 15 }),
        craftCell(e.risk, { colSpan: 55 }),
    ),)
];

const medicalRetirementEvaluation: CraftItemFunc<RetirementRecord> = (record): Row[] => [
    craftRow(
        craftTitle('Se realizó la evaluación', { colSpan: 15 }),
        craftTitle('Sí', { colSpan: 5 }),
        craftCell(record.retirementEvaluationDone ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        craftTitle('No', { colSpan: 5 }),
        craftCell(!record.retirementEvaluationDone ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        emptyCell({ colSpan: 35 })
    ),
    craftLabel('Observaciones'),
    craftRow(craftCell(record.retirementEvaluationObservation ?? '', { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];